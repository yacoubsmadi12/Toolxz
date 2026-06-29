import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';

// Category pages
import SecurityTools from '@/pages/tools/security';
import QrBarcodeTools from '@/pages/tools/qr-barcode';
import ImageTools from '@/pages/tools/image';
import TextTools from '@/pages/tools/text';
import NumberMathTools from '@/pages/tools/number-math';
import UnitConverters from '@/pages/tools/unit-converters';
import DateTimeTools from '@/pages/tools/date-time';
import WebDevTools from '@/pages/tools/web-dev';
import EncodeDecodeTools from '@/pages/tools/encode-decode';
import FinanceTools from '@/pages/tools/finance';
import FunRandomTools from '@/pages/tools/fun-random';
import ProductivityTools from '@/pages/tools/productivity';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Security Tools */}
      <Route path="/tools/password-generator"><SecurityTools active="password-generator" /></Route>
      <Route path="/tools/password-strength"><SecurityTools active="password-strength" /></Route>
      <Route path="/tools/hash-generator"><SecurityTools active="hash-generator" /></Route>
      <Route path="/tools/uuid-generator"><SecurityTools active="uuid-generator" /></Route>
      <Route path="/tools/random-string"><SecurityTools active="random-string" /></Route>

      {/* QR & Barcode */}
      <Route path="/tools/qr-generator"><QrBarcodeTools active="qr-generator" /></Route>
      <Route path="/tools/qr-reader"><QrBarcodeTools active="qr-reader" /></Route>
      <Route path="/tools/barcode-generator"><QrBarcodeTools active="barcode-generator" /></Route>

      {/* Image Tools */}
      <Route path="/tools/image-compressor"><ImageTools active="image-compressor" /></Route>
      <Route path="/tools/image-resizer"><ImageTools active="image-resizer" /></Route>
      <Route path="/tools/image-to-base64"><ImageTools active="image-to-base64" /></Route>
      <Route path="/tools/base64-to-image"><ImageTools active="base64-to-image" /></Route>
      <Route path="/tools/image-color-picker"><ImageTools active="image-color-picker" /></Route>
      <Route path="/tools/grayscale-converter"><ImageTools active="grayscale-converter" /></Route>
      <Route path="/tools/image-flipper"><ImageTools active="image-flipper" /></Route>

      {/* Text Tools */}
      <Route path="/tools/word-counter"><TextTools active="word-counter" /></Route>
      <Route path="/tools/character-counter"><TextTools active="character-counter" /></Route>
      <Route path="/tools/text-case-converter"><TextTools active="text-case-converter" /></Route>
      <Route path="/tools/lorem-ipsum"><TextTools active="lorem-ipsum" /></Route>
      <Route path="/tools/text-reverser"><TextTools active="text-reverser" /></Route>
      <Route path="/tools/duplicate-line-remover"><TextTools active="duplicate-line-remover" /></Route>
      <Route path="/tools/text-sorter"><TextTools active="text-sorter" /></Route>
      <Route path="/tools/whitespace-remover"><TextTools active="whitespace-remover" /></Route>
      <Route path="/tools/find-replace"><TextTools active="find-replace" /></Route>
      <Route path="/tools/morse-code"><TextTools active="morse-code" /></Route>
      <Route path="/tools/rot13"><TextTools active="rot13" /></Route>
      <Route path="/tools/caesar-cipher"><TextTools active="caesar-cipher" /></Route>
      <Route path="/tools/slug-generator"><TextTools active="slug-generator" /></Route>
      <Route path="/tools/fancy-text"><TextTools active="fancy-text" /></Route>

      {/* Number & Math */}
      <Route path="/tools/age-calculator"><NumberMathTools active="age-calculator" /></Route>
      <Route path="/tools/percentage-calculator"><NumberMathTools active="percentage-calculator" /></Route>
      <Route path="/tools/bmi-calculator"><NumberMathTools active="bmi-calculator" /></Route>
      <Route path="/tools/emi-calculator"><NumberMathTools active="emi-calculator" /></Route>
      <Route path="/tools/tip-calculator"><NumberMathTools active="tip-calculator" /></Route>
      <Route path="/tools/discount-calculator"><NumberMathTools active="discount-calculator" /></Route>
      <Route path="/tools/currency-converter"><NumberMathTools active="currency-converter" /></Route>
      <Route path="/tools/number-base-converter"><NumberMathTools active="number-base-converter" /></Route>
      <Route path="/tools/roman-numerals"><NumberMathTools active="roman-numerals" /></Route>
      <Route path="/tools/prime-checker"><NumberMathTools active="prime-checker" /></Route>
      <Route path="/tools/factorial"><NumberMathTools active="factorial" /></Route>
      <Route path="/tools/gcd-lcm"><NumberMathTools active="gcd-lcm" /></Route>
      <Route path="/tools/scientific-calculator"><NumberMathTools active="scientific-calculator" /></Route>

      {/* Unit Converters */}
      <Route path="/tools/length-converter"><UnitConverters active="length-converter" /></Route>
      <Route path="/tools/weight-converter"><UnitConverters active="weight-converter" /></Route>
      <Route path="/tools/temperature-converter"><UnitConverters active="temperature-converter" /></Route>
      <Route path="/tools/area-converter"><UnitConverters active="area-converter" /></Route>
      <Route path="/tools/volume-converter"><UnitConverters active="volume-converter" /></Route>
      <Route path="/tools/speed-converter"><UnitConverters active="speed-converter" /></Route>
      <Route path="/tools/time-converter"><UnitConverters active="time-converter" /></Route>
      <Route path="/tools/data-storage-converter"><UnitConverters active="data-storage-converter" /></Route>
      <Route path="/tools/pressure-converter"><UnitConverters active="pressure-converter" /></Route>
      <Route path="/tools/energy-converter"><UnitConverters active="energy-converter" /></Route>

      {/* Date & Time */}
      <Route path="/tools/date-difference"><DateTimeTools active="date-difference" /></Route>
      <Route path="/tools/add-subtract-days"><DateTimeTools active="add-subtract-days" /></Route>
      <Route path="/tools/unix-timestamp"><DateTimeTools active="unix-timestamp" /></Route>
      <Route path="/tools/day-of-week"><DateTimeTools active="day-of-week" /></Route>
      <Route path="/tools/countdown-timer"><DateTimeTools active="countdown-timer" /></Route>
      <Route path="/tools/stopwatch"><DateTimeTools active="stopwatch" /></Route>
      <Route path="/tools/world-clock"><DateTimeTools active="world-clock" /></Route>

      {/* Web & Dev Tools */}
      <Route path="/tools/url-encoder"><WebDevTools active="url-encoder" /></Route>
      <Route path="/tools/html-encoder"><WebDevTools active="html-encoder" /></Route>
      <Route path="/tools/json-formatter"><WebDevTools active="json-formatter" /></Route>
      <Route path="/tools/json-minifier"><WebDevTools active="json-minifier" /></Route>
      <Route path="/tools/json-to-csv"><WebDevTools active="json-to-csv" /></Route>
      <Route path="/tools/csv-to-json"><WebDevTools active="csv-to-json" /></Route>
      <Route path="/tools/color-picker"><WebDevTools active="color-picker" /></Route>
      <Route path="/tools/color-palette"><WebDevTools active="color-palette" /></Route>
      <Route path="/tools/gradient-generator"><WebDevTools active="gradient-generator" /></Route>
      <Route path="/tools/box-shadow"><WebDevTools active="box-shadow" /></Route>
      <Route path="/tools/border-radius"><WebDevTools active="border-radius" /></Route>
      <Route path="/tools/meta-tag-generator"><WebDevTools active="meta-tag-generator" /></Route>
      <Route path="/tools/og-tag-generator"><WebDevTools active="og-tag-generator" /></Route>
      <Route path="/tools/robots-txt"><WebDevTools active="robots-txt" /></Route>
      <Route path="/tools/button-generator"><WebDevTools active="button-generator" /></Route>
      <Route path="/tools/regex-tester"><WebDevTools active="regex-tester" /></Route>

      {/* Encode/Decode */}
      <Route path="/tools/base64-encoder"><EncodeDecodeTools active="base64-encoder" /></Route>
      <Route path="/tools/binary-to-text"><EncodeDecodeTools active="binary-to-text" /></Route>
      <Route path="/tools/ascii-art"><EncodeDecodeTools active="ascii-art" /></Route>

      {/* Finance Tools */}
      <Route path="/tools/compound-interest"><FinanceTools active="compound-interest" /></Route>
      <Route path="/tools/simple-interest"><FinanceTools active="simple-interest" /></Route>
      <Route path="/tools/salary-calculator"><FinanceTools active="salary-calculator" /></Route>
      <Route path="/tools/vat-calculator"><FinanceTools active="vat-calculator" /></Route>
      <Route path="/tools/retirement-calculator"><FinanceTools active="retirement-calculator" /></Route>

      {/* Fun & Random */}
      <Route path="/tools/random-number"><FunRandomTools active="random-number" /></Route>
      <Route path="/tools/coin-flipper"><FunRandomTools active="coin-flipper" /></Route>
      <Route path="/tools/dice-roller"><FunRandomTools active="dice-roller" /></Route>
      <Route path="/tools/random-name-picker"><FunRandomTools active="random-name-picker" /></Route>
      <Route path="/tools/yes-no"><FunRandomTools active="yes-no" /></Route>
      <Route path="/tools/color-name-finder"><FunRandomTools active="color-name-finder" /></Route>
      <Route path="/tools/random-color"><FunRandomTools active="random-color" /></Route>

      {/* Productivity */}
      <Route path="/tools/todo-list"><ProductivityTools active="todo-list" /></Route>
      <Route path="/tools/pomodoro-timer"><ProductivityTools active="pomodoro-timer" /></Route>
      <Route path="/tools/notes-pad"><ProductivityTools active="notes-pad" /></Route>
      <Route path="/tools/word-frequency"><ProductivityTools active="word-frequency" /></Route>
      <Route path="/tools/text-to-speech"><ProductivityTools active="text-to-speech" /></Route>
      <Route path="/tools/speech-to-text"><ProductivityTools active="speech-to-text" /></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="dark">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
