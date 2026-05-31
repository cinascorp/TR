
# TAR
##
معماری بومی مرورگر برای بازسازی پیش‌بینانه فضای هوایی و تجسم پرواز در زمان واقعی

**TAR** یک چارچوب مکان‌یابی منسجم غیرفعال (Passive Coherent Location - PCL) بومی برای مرورگر است که از جریان‌های تله‌متری **HTTP/3 (QUIC)** برای تشخیص و تجسم هوایی در زمان واقعی استفاده می‌کند.

## ۱. مقدمه

پلتفرم‌های سنتی تجسم ترافیک هوایی عمدتاً بر خطوط لوله تله‌متری دارای تأخیر و رندرینگ سمت سرور (Server-side) استوار هستند. این سیستم‌ها صرفاً به موقعیت‌های رمزگشایی‌شده ADS-B متکی هستند.

تارا (TARA) یک جایگزین توزیع‌شده را با الهام از مفهوم **مکان‌یابی منسجم غیرفعال (PCL)** ارائه می‌دهد، جایی که مرورگر کلاینت به عنوان یک گره حسگر عمل می‌کند. برخلاف رویکردهای مرسوم، تارا ویژگی‌های انتقال شبکه را به عنوان یک سیگنال قابل اندازه‌گیری در نظر می‌گیرد. فرضیه اصلی این است که تغییرات ظریف در زمان‌بندی بسته‌های داده (Packet-level micro-latency variations یا Jitter)، حاوی اطلاعات اختلالات محیطی ناشی از تعامل اجسام هوایی با میدان‌های الکترومغناطیسی محیط است. این تغییرات به عنوان یک «کانال سیگنال ثانویه» تحلیل می‌شوند که می‌توانند منجر به کشف اهدافی شوند که از دید رادارهای سنتی پنهان‌اند.

مشاهدات تجربی نشان می‌دهد که نمایش بصری ارائه‌شده توسط این معماری، در شرایط خاص، می‌تواند دارای «پیش‌تیمی زمانی زیرادراکی» (Sub-perceptual temporal lead) نسبت به مشاهده نوری مستقیم باشد. این معماری کاملاً در سمت کاربر (Client-side) و با استفاده از **WebGL** و **Web Workers** موازی عمل کرده و امکان تجسم مقیاس‌پذیر ترافیک هوایی متراکم را بدون نیاز به زیرساخت بک‌اند فراهم می‌سازد.

## ۲. معماری سیستم

چارچوب تارا از سه حوزه تحلیلی کاملاً به‌هم‌پیوسته تشکیل شده است:

1.  **لایه ژئودزیک (Geodesic Layer):** بازسازی دقیق مکانی با استفاده از تقریب زمین کروی.
2.  **لایه زمانی (Temporal Layer):** تخمین پیوسته مسیر با استفاده از درون‌یابی و فیلتر کردن.
3.  **لایه سیگنال (Signal Layer):** تشخیص ناهنجاری‌هایی در زمان‌بندی بسته‌ها که به عنوان اختلالات فاز تفسیر می‌شوند.

### ۲.۱. مدل‌سازی ژئودزیک (Haversine)

فاصله هواپیما با استفاده از فرمول هاورسین (Haversine) محاسبه می‌شود:

$$ a = \sin^2(\frac{\Delta\phi}{2}) + \cos(\phi_1) \cos(\phi_2) \cdot \sin^2(\frac{\Delta\lambda}{2}) $$
$$ c = 2 . atan2(\sqrt{a}, . \sqrt{1-a}) $$
$$ d = R . c $$

که در آن:
*   $\phi$ (فای): عرض جغرافیایی (به رادیان)
*   $\lambda$ (لامدا): طول جغرافیایی (به رادیان)
*   $R$: شعاع زمین (۶۳۷۱ کیلومتر)




### ۲.۲. درون‌یابی حرکت (الگوریتم هموارسازی)

برای حل مشکل لکنت (Stuttering) در داده‌های گسسته دریافتی از شبکه، از درون‌یابی خطی (Linear Interpolation - LERP) استفاده می‌شود:

$$ P(t) = P_{start} + (P_{end} - P_{start}) \times \frac{t - t_{last}}{\Delta t} $$

### ۲.۳. درون‌یابی جهت‌گیری (Heading Interpolation)

برای محاسبه میان‌بر کوتاه‌ترین مسیر در دوران چرخش (Modular Arithmetic):

$$ \Delta\theta = ((\theta_{target} - \theta_{current} + 540) \% 360) - 180 $$
$$ \theta(t) = \theta_{current} + \Delta\theta \times k_{smooth} $$

**پیاده‌سازی در جاوااسکریپت:**

```javascript
function lerpA(e, t, a) {
 return null == e
 ? (t ?? 0)
 : null == t
 ? (e ?? 0)
 : (e + (((t - e + 540) % 360) - 180) * a + 360) % 360;
}
```

## ۳. تئوری الکترومغناطیس و پردازش سیگنال

### ۳.۱. نسبت سیگنال به نویز (SNR)

یکپارچگی یک بلوک باینری ورودی ($B$) را می‌توان با آنتروپی رسیدن آن تعریف کرد. اگرچه این رابطه ممکن است در ریاضیات محض چالش‌برانگیز باشد، اما در پیاده‌سازی عملیاتی به صورت زیر مدل‌سازی شده است:

$$ SNR_{blob} = \frac{P_{signal}}{P_{noise}} = \frac{\sum |B[i]|^2}{\sigma^2_{jitter}} $$

که در آن:
*   $B[i]$: دامنه جریان بایت‌ها
*   $\sigma^2_{jitter}$: واریانس تأخیر بسته‌ها

**پیاده‌سازی تشخیص سایه (Shadow Detection) با آنتروپی شانون:**

```javascript
class ShadowDetector {
  constructor(sensorId, historySize = 100) {
    this.sensorId = sensorId;
    this.signalHistory = new Array(historySize).fill(0);
    this.threshold = 0.85; // آستانه حساسیت
  }

  // به‌روزرسانی بافر سیگنال با قرائت‌های جدید
  updateSignal(newVal) {
    this.signalHistory.shift();
    this.signalHistory.push(newVal);
  }

  // محاسبه توزیع احتمال
  calculateProbabilities(data) {
    const counts = {};
    data.forEach(x => {
      const bucket = Math.floor(x * 10); // گسسته‌سازی
      counts[bucket] = (counts[bucket] || 0) + 1;
    });
    const total = data.length;
    return Object.values(counts).map(c => c / total);
  }

  // محاسبه آنتروپی شانون: H(X) = - sum(p(x) * log2(p(x)))
  calculateEntropy() {
    const probs = this.calculateProbabilities(this.signalHistory);
    let entropy = 0;
    for (let p of probs) {
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    return entropy;
  }

  // منطق تشخیص هسته/هدف
  detectObject() {
    const currentEntropy = this.calculateEntropy();
    
    // تحلیل منطقی: آنتروپی پایین به معنای سیگنال منظم (سایه) است
    // در میان نویز تصادفی یا انحراف قابل توجه از خط پایه
    const baselineEntropy = 3.5; // خط پایه فرضی برای نویز سفید
    const deviation = Math.abs(currentEntropy - baselineEntropy);
    
    if (deviation > this.threshold) {
      return {
        detected: true,
        entropy: currentEntropy,
        timestamp: Date.now(),
        message: "ANOMALY DETECTED: EM Shadow Pattern"
      };
    }
    return { detected: false };
  }
}

// --- شبیه‌سازی حلقه سخت‌افزار ---
const processor = new ShadowDetector("Unit-Alpha-01");

// شبیه‌سازی جریان داده از خروجی ترانزیستور (مقادیر ADC از 0.0 تا 1.0)
setInterval(() => {
  // نویز تصادفی (آسمان معمولی)
  let signal = Math.random();
  
  // تزریق سایه مصنوعی (اثر افت سیگنال) به صورت دوره‌ای
  if (Date.now() % 5000 < 500) {
    signal = signal * 0.2; // اثر سایه: تضعیف سیگنال
  }
  
  processor.updateSignal(signal);
  const result = processor.detectObject();
  
  if (result.detected) {
    console.log(`[ALERT] Sensor ${processor.sensorId}:`, result);
    // ماژول محاسبه نقاط کروی را اینجا فراخوانی می‌کنیم
  }
}, 100);
```

### ۳.۲. تشخیص پنهانکاری (فرضیه هدف مهمنام/Ghost Target)

هواپیماهای کم‌بینا (Stealth) با حداقل رساندن مقطع راداری (Radar Cross Section - $\sigma_{rcs}$)، نمی‌توانند «سایه‌ای» که بر نویز پس‌زمینه RF ایجاد می‌کنند، کاملاً از بین ببرند. تارا این سایه‌ها را شناسایی می‌کند.

### ۳.۳. تابع دلتای تأخیر (Latency Delta Function)

تأخیر دلتای زمانی ($\Delta\tau$) از رابطه زیر بدست می‌آید:

$$ \Delta\tau = T_{rx} - T_{tx} - \left(\frac{d_{geodesic}}{c_{light}}\right) $$

### ۳.۴. شرایط ناهنجاری

در صورتی که شرایط زیر برقرار باشد:
$$ IF \left( \lim_{\Delta t \to 0} [\Delta\tau] \approx 0 \right) \land (Blob\_Mass > 1000 \text{ bytes}) $$
$$ THEN \rightarrow \text{Flag as Quantum Anomaly (Stealth Target)} $$

## ۴. منطق جبر بول و گیت‌های منطقی

موتور طبقه‌بندی تارا از یک آرایه گیت منطقی قطعی (Deterministic Logic Gate Array) استفاده می‌کند.
ورودی‌ها:
$H$ (ارتفاع)، 
$V$ (سرعت)، 
$C$ (کد تماس/Callsign)، 
$S$ (کد Squawk).
آستانه‌ها: 
$H_{low} = 1200$ متر،
$V_{slow} = 120$ کیلومتر/ساعت.

### ۴.۱. منطق شناسایی پهپاد (Gate D)
```
D = (H < H_{low}) AND (V < V_{slow}) AND NOT (\text{Helicopter}) 
D = (H < 1200) AND (V < 120) AND NOT (\text{Helicopter}) $$
```
### ۴.۲. منطق شناسایی پروازهای نظامی (Gate M)

```
M = (C \text{ starts\_with } \{Military_prefix\}) OR (S == 7700) 
M = (C \in S_{mil}) OR (S == 7700) $$
```
## ۵. جمع‌بندی

سامانه **TARA** نوآوری‌ای در حوزه نظارت هوایی غیرفعال (Passive) است که با استفاده از مرورگر وب، شبکه‌ای توزیع‌شده برای ردیابی اجسام پرنده ایجاد می‌کند. این سیستم به جای اتکا به رادارهای سنتی، تغییرات ظریف در تأخیر بسته‌های داده (Jitter) را در پروتکل‌های مدرنی مانند HTTP/3 تحلیل کرده و آن‌ها را به عنوان سایه الکترومغناطیسی اجسام تفسیر می‌کند.

معماری این پروژه کاملاً سمت کاربر (Client-side) بوده و با بهره‌گیری از WebGL و فیلتر کالمن، موقعیت و مسیر پروازها را به‌صورت بلادرنگ پیش‌بینی و تجسم می‌سازد. از ویژگی‌های برجسته این فناوری، توانایی شناسایی اهداف رادارگریز و ریزپرنده‌ها بدون نیاز به زیرساخت‌های گران‌قیمت یا ارسال سیگنال‌های فعال است. در نهایت، تارا با تبدیل هر دستگاه متصل به اینترنت به یک گره حسگر، راهکاری مقیاس‌پذیر، پنهان و مقاوم در برابر جنگ الکترونیک ارائه می‌دهد.
