export type Category = 
  | "Security & Password"
  | "QR & Barcode"
  | "Image Tools"
  | "Text Tools"
  | "Number & Math"
  | "Unit Converters"
  | "Date & Time"
  | "Web & Dev Tools"
  | "Encode/Decode"
  | "Finance Tools"
  | "Fun & Random"
  | "Productivity";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: string;
  route: string;
  tags: string[];
}

export const CATEGORY_COLORS: Record<Category, { text: string, bg: string, border: string }> = {
  "Security & Password": { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  "QR & Barcode": { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  "Image Tools": { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  "Text Tools": { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  "Number & Math": { text: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  "Unit Converters": { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  "Date & Time": { text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  "Web & Dev Tools": { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  "Encode/Decode": { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  "Finance Tools": { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  "Fun & Random": { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  "Productivity": { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" }
};

export const tools: Tool[] = [
  // Security & Password
  { id: "password-generator", name: "Password Generator", description: "Generate secure, random passwords with custom rules.", category: "Security & Password", icon: "🔑", route: "/tools/password-generator", tags: ["password", "security", "random"] },
  { id: "password-strength", name: "Password Strength", description: "Check how strong and secure your password is.", category: "Security & Password", icon: "💪", route: "/tools/password-strength", tags: ["password", "security", "checker"] },
  { id: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes.", category: "Security & Password", icon: "🔐", route: "/tools/hash-generator", tags: ["hash", "md5", "sha256", "crypto"] },
  { id: "uuid-generator", name: "UUID Generator", description: "Generate random v4 UUIDs in bulk.", category: "Security & Password", icon: "🆔", route: "/tools/uuid-generator", tags: ["uuid", "guid", "random"] },
  { id: "random-string", name: "Random String", description: "Generate random alphanumeric strings.", category: "Security & Password", icon: "🔀", route: "/tools/random-string", tags: ["string", "random", "text"] },

  // QR & Barcode
  { id: "qr-generator", name: "QR Generator", description: "Create QR codes from text or URLs.", category: "QR & Barcode", icon: "📱", route: "/tools/qr-generator", tags: ["qr", "code", "generator"] },
  { id: "qr-reader", name: "QR Reader", description: "Decode QR codes from images.", category: "QR & Barcode", icon: "🔍", route: "/tools/qr-reader", tags: ["qr", "reader", "scanner"] },
  { id: "barcode-generator", name: "Barcode Generator", description: "Generate standard barcodes (Code128, EAN13, etc).", category: "QR & Barcode", icon: "🏪", route: "/tools/barcode-generator", tags: ["barcode", "generator", "code128"] },

  // Image Tools
  { id: "image-compressor", name: "Image Compressor", description: "Compress images to reduce file size.", category: "Image Tools", icon: "🗜️", route: "/tools/image-compressor", tags: ["image", "compress", "size"] },
  { id: "image-resizer", name: "Image Resizer", description: "Resize images to specific dimensions.", category: "Image Tools", icon: "📐", route: "/tools/image-resizer", tags: ["image", "resize", "scale"] },
  { id: "image-to-base64", name: "Image to Base64", description: "Convert an image to a base64 encoded string.", category: "Image Tools", icon: "🖼️", route: "/tools/image-to-base64", tags: ["image", "base64", "encoder"] },
  { id: "base64-to-image", name: "Base64 to Image", description: "Decode a base64 string back into an image.", category: "Image Tools", icon: "🔄", route: "/tools/base64-to-image", tags: ["base64", "image", "decoder"] },
  { id: "image-color-picker", name: "Image Color Picker", description: "Extract colors from any uploaded image.", category: "Image Tools", icon: "🎨", route: "/tools/image-color-picker", tags: ["color", "picker", "image"] },
  { id: "grayscale-converter", name: "Grayscale Converter", description: "Convert color images to black and white.", category: "Image Tools", icon: "🔲", route: "/tools/grayscale-converter", tags: ["grayscale", "image", "filter"] },
  { id: "image-flipper", name: "Image Flipper", description: "Flip and rotate images easily.", category: "Image Tools", icon: "🙃", route: "/tools/image-flipper", tags: ["flip", "rotate", "image"] },

  // Text Tools
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, and reading time.", category: "Text Tools", icon: "📝", route: "/tools/word-counter", tags: ["word", "count", "text"] },
  { id: "character-counter", name: "Character Counter", description: "Count characters with limits and progress.", category: "Text Tools", icon: "🔤", route: "/tools/character-counter", tags: ["character", "count", "limit"] },
  { id: "text-case-converter", name: "Case Converter", description: "Convert text to UPPERCASE, lowercase, camelCase, etc.", category: "Text Tools", icon: "Aa", route: "/tools/text-case-converter", tags: ["case", "uppercase", "lowercase"] },
  { id: "lorem-ipsum", name: "Lorem Ipsum", description: "Generate placeholder text for designs.", category: "Text Tools", icon: "📜", route: "/tools/lorem-ipsum", tags: ["lorem", "ipsum", "placeholder"] },
  { id: "text-reverser", name: "Text Reverser", description: "Reverse characters or words in a text.", category: "Text Tools", icon: "⏪", route: "/tools/text-reverser", tags: ["reverse", "text", "backwards"] },
  { id: "duplicate-line-remover", name: "Duplicate Remover", description: "Remove duplicate lines from a list.", category: "Text Tools", icon: "🗑️", route: "/tools/duplicate-line-remover", tags: ["duplicate", "remove", "lines"] },
  { id: "text-sorter", name: "Text Sorter", description: "Sort text alphabetically or by length.", category: "Text Tools", icon: "🔠", route: "/tools/text-sorter", tags: ["sort", "text", "order"] },
  { id: "whitespace-remover", name: "Whitespace Remover", description: "Clean up extra spaces and blank lines.", category: "Text Tools", icon: "🧹", route: "/tools/whitespace-remover", tags: ["whitespace", "spaces", "trim"] },
  { id: "find-replace", name: "Find & Replace", description: "Find and replace text with options.", category: "Text Tools", icon: "🔎", route: "/tools/find-replace", tags: ["find", "replace", "text"] },
  { id: "morse-code", name: "Morse Code", description: "Convert text to and from Morse code.", category: "Text Tools", icon: "📡", route: "/tools/morse-code", tags: ["morse", "code", "encode"] },
  { id: "rot13", name: "ROT13 Encoder", description: "Apply ROT13 cipher to your text.", category: "Text Tools", icon: "🔄", route: "/tools/rot13", tags: ["rot13", "cipher", "encode"] },
  { id: "caesar-cipher", name: "Caesar Cipher", description: "Encode and decode text using Caesar cipher.", category: "Text Tools", icon: "🏛️", route: "/tools/caesar-cipher", tags: ["caesar", "cipher", "encode"] },
  { id: "slug-generator", name: "Slug Generator", description: "Convert text into a URL-friendly slug.", category: "Text Tools", icon: "🔗", route: "/tools/slug-generator", tags: ["slug", "url", "text"] },
  { id: "fancy-text", name: "Fancy Text", description: "Generate unicode styled text for social media.", category: "Text Tools", icon: "✨", route: "/tools/fancy-text", tags: ["fancy", "text", "fonts", "unicode"] },

  // Number & Math
  { id: "age-calculator", name: "Age Calculator", description: "Calculate exact age and next birthday.", category: "Number & Math", icon: "🎂", route: "/tools/age-calculator", tags: ["age", "date", "birth"] },
  { id: "percentage-calculator", name: "Percentage", description: "Calculate percentages and differences.", category: "Number & Math", icon: "%\uFE0F", route: "/tools/percentage-calculator", tags: ["percent", "math", "calculator"] },
  { id: "bmi-calculator", name: "BMI Calculator", description: "Check your Body Mass Index.", category: "Number & Math", icon: "⚖️", route: "/tools/bmi-calculator", tags: ["bmi", "health", "weight"] },
  { id: "emi-calculator", name: "EMI Calculator", description: "Calculate loan Equated Monthly Installments.", category: "Number & Math", icon: "🏦", route: "/tools/emi-calculator", tags: ["emi", "loan", "finance"] },
  { id: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills.", category: "Number & Math", icon: "💵", route: "/tools/tip-calculator", tags: ["tip", "bill", "split"] },
  { id: "discount-calculator", name: "Discount Calculator", description: "Calculate savings from discounts.", category: "Number & Math", icon: "🏷️", route: "/tools/discount-calculator", tags: ["discount", "sale", "price"] },
  { id: "currency-converter", name: "Currency Converter", description: "Convert between major world currencies.", category: "Number & Math", icon: "💱", route: "/tools/currency-converter", tags: ["currency", "money", "exchange"] },
  { id: "number-base-converter", name: "Base Converter", description: "Convert between binary, octal, decimal, hex.", category: "Number & Math", icon: "🔢", route: "/tools/number-base-converter", tags: ["base", "binary", "hex"] },
  { id: "roman-numerals", name: "Roman Numerals", description: "Convert numbers to and from Roman numerals.", category: "Number & Math", icon: "🏛️", route: "/tools/roman-numerals", tags: ["roman", "numerals", "math"] },
  { id: "prime-checker", name: "Prime Checker", description: "Check if a number is prime.", category: "Number & Math", icon: "🎯", route: "/tools/prime-checker", tags: ["prime", "math", "number"] },
  { id: "factorial", name: "Factorial Calculator", description: "Calculate the factorial of a number.", category: "Number & Math", icon: "❗", route: "/tools/factorial", tags: ["factorial", "math"] },
  { id: "gcd-lcm", name: "GCD & LCM", description: "Calculate Greatest Common Divisor and Least Common Multiple.", category: "Number & Math", icon: "➗", route: "/tools/gcd-lcm", tags: ["gcd", "lcm", "math"] },
  { id: "scientific-calculator", name: "Scientific Calc", description: "A full-featured scientific calculator.", category: "Number & Math", icon: "🖩", route: "/tools/scientific-calculator", tags: ["calculator", "math", "science"] },

  // Unit Converters
  { id: "length-converter", name: "Length Converter", description: "Convert meters, feet, inches, miles, etc.", category: "Unit Converters", icon: "📏", route: "/tools/length-converter", tags: ["length", "distance", "converter"] },
  { id: "weight-converter", name: "Weight Converter", description: "Convert kilograms, pounds, ounces, etc.", category: "Unit Converters", icon: "⚖️", route: "/tools/weight-converter", tags: ["weight", "mass", "converter"] },
  { id: "temperature-converter", name: "Temp Converter", description: "Convert Celsius, Fahrenheit, Kelvin.", category: "Unit Converters", icon: "🌡️", route: "/tools/temperature-converter", tags: ["temperature", "heat", "converter"] },
  { id: "area-converter", name: "Area Converter", description: "Convert square meters, acres, hectares, etc.", category: "Unit Converters", icon: "🗺️", route: "/tools/area-converter", tags: ["area", "size", "converter"] },
  { id: "volume-converter", name: "Volume Converter", description: "Convert liters, gallons, cups, etc.", category: "Unit Converters", icon: "🧪", route: "/tools/volume-converter", tags: ["volume", "capacity", "converter"] },
  { id: "speed-converter", name: "Speed Converter", description: "Convert km/h, mph, knots, etc.", category: "Unit Converters", icon: "🏎️", route: "/tools/speed-converter", tags: ["speed", "velocity", "converter"] },
  { id: "time-converter", name: "Time Converter", description: "Convert seconds, minutes, hours, days.", category: "Unit Converters", icon: "⏱️", route: "/tools/time-converter", tags: ["time", "duration", "converter"] },
  { id: "data-storage-converter", name: "Data Storage", description: "Convert bytes, KB, MB, GB, TB.", category: "Unit Converters", icon: "💾", route: "/tools/data-storage-converter", tags: ["data", "storage", "bytes"] },
  { id: "pressure-converter", name: "Pressure Converter", description: "Convert Pascals, bar, psi, atm.", category: "Unit Converters", icon: "🎈", route: "/tools/pressure-converter", tags: ["pressure", "bar", "psi"] },
  { id: "energy-converter", name: "Energy Converter", description: "Convert Joules, calories, kWh.", category: "Unit Converters", icon: "⚡", route: "/tools/energy-converter", tags: ["energy", "power", "joules"] },

  // Date & Time
  { id: "date-difference", name: "Date Difference", description: "Calculate the time between two dates.", category: "Date & Time", icon: "📅", route: "/tools/date-difference", tags: ["date", "difference", "time"] },
  { id: "add-subtract-days", name: "Add/Subtract Days", description: "Find a date by adding or subtracting days.", category: "Date & Time", icon: "🗓️", route: "/tools/add-subtract-days", tags: ["date", "add", "subtract"] },
  { id: "unix-timestamp", name: "Unix Timestamp", description: "Convert Unix timestamps to readable dates.", category: "Date & Time", icon: "⏳", route: "/tools/unix-timestamp", tags: ["unix", "timestamp", "epoch"] },
  { id: "day-of-week", name: "Day of Week", description: "Find the day of the week for any date.", category: "Date & Time", icon: "📆", route: "/tools/day-of-week", tags: ["day", "week", "date"] },
  { id: "countdown-timer", name: "Countdown Timer", description: "Create a countdown to a specific date/time.", category: "Date & Time", icon: "⏲️", route: "/tools/countdown-timer", tags: ["countdown", "timer", "clock"] },
  { id: "stopwatch", name: "Stopwatch", description: "A simple stopwatch with lap times.", category: "Date & Time", icon: "⏱️", route: "/tools/stopwatch", tags: ["stopwatch", "timer", "laps"] },
  { id: "world-clock", name: "World Clock", description: "View the time in major cities worldwide.", category: "Date & Time", icon: "🌍", route: "/tools/world-clock", tags: ["world", "clock", "timezone"] },

  // Web & Dev Tools
  { id: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URL strings safely.", category: "Web & Dev Tools", icon: "🔗", route: "/tools/url-encoder", tags: ["url", "encode", "decode"] },
  { id: "html-encoder", name: "HTML Encoder/Decoder", description: "Escape or unescape HTML entities.", category: "Web & Dev Tools", icon: "🌐", route: "/tools/html-encoder", tags: ["html", "encode", "entities"] },
  { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON data.", category: "Web & Dev Tools", icon: "{} ", route: "/tools/json-formatter", tags: ["json", "format", "validate"] },
  { id: "json-minifier", name: "JSON Minifier", description: "Minify JSON to save space.", category: "Web & Dev Tools", icon: "🗜️", route: "/tools/json-minifier", tags: ["json", "minify", "compress"] },
  { id: "json-to-csv", name: "JSON to CSV", description: "Convert JSON arrays to CSV format.", category: "Web & Dev Tools", icon: "📊", route: "/tools/json-to-csv", tags: ["json", "csv", "convert"] },
  { id: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data into JSON arrays.", category: "Web & Dev Tools", icon: "🔄", route: "/tools/csv-to-json", tags: ["csv", "json", "convert"] },
  { id: "color-picker", name: "Color Picker", description: "Pick colors in HEX, RGB, and HSL.", category: "Web & Dev Tools", icon: "🎨", route: "/tools/color-picker", tags: ["color", "picker", "hex"] },
  { id: "color-palette", name: "Color Palette", description: "Generate complementary and analogous palettes.", category: "Web & Dev Tools", icon: "🖌️", route: "/tools/color-palette", tags: ["color", "palette", "generator"] },
  { id: "gradient-generator", name: "Gradient Generator", description: "Create and export CSS linear gradients.", category: "Web & Dev Tools", icon: "🌈", route: "/tools/gradient-generator", tags: ["gradient", "css", "color"] },
  { id: "box-shadow", name: "Box Shadow", description: "Visually generate CSS box-shadows.", category: "Web & Dev Tools", icon: "⬛", route: "/tools/box-shadow", tags: ["css", "shadow", "generator"] },
  { id: "border-radius", name: "Border Radius", description: "Generate CSS border-radius curves.", category: "Web & Dev Tools", icon: "⭕", route: "/tools/border-radius", tags: ["css", "border", "radius"] },
  { id: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate HTML meta tags for SEO.", category: "Web & Dev Tools", icon: "🏷️", route: "/tools/meta-tag-generator", tags: ["seo", "meta", "html"] },
  { id: "og-tag-generator", name: "OG Tag Generator", description: "Generate Open Graph tags for social sharing.", category: "Web & Dev Tools", icon: "📱", route: "/tools/og-tag-generator", tags: ["og", "social", "meta"] },
  { id: "robots-txt", name: "Robots.txt Gen", description: "Generate a robots.txt file for your site.", category: "Web & Dev Tools", icon: "🤖", route: "/tools/robots-txt", tags: ["seo", "robots", "crawler"] },
  { id: "button-generator", name: "CSS Button Gen", description: "Design CSS buttons visually and copy code.", category: "Web & Dev Tools", icon: "🔘", route: "/tools/button-generator", tags: ["css", "button", "generator"] },
  { id: "regex-tester", name: "Regex Tester", description: "Test and debug regular expressions.", category: "Web & Dev Tools", icon: "🔍", route: "/tools/regex-tester", tags: ["regex", "test", "expression"] },

  // Encode/Decode
  { id: "base64-encoder", name: "Base64 String", description: "Encode and decode text to Base64.", category: "Encode/Decode", icon: "🔡", route: "/tools/base64-encoder", tags: ["base64", "encode", "text"] },
  { id: "binary-to-text", name: "Binary to Text", description: "Convert between binary and normal text.", category: "Encode/Decode", icon: "01", route: "/tools/binary-to-text", tags: ["binary", "text", "convert"] },
  { id: "ascii-art", name: "ASCII Art Gen", description: "Convert text to ASCII art banners.", category: "Encode/Decode", icon: "🖼️", route: "/tools/ascii-art", tags: ["ascii", "art", "text"] },

  // Finance Tools
  { id: "compound-interest", name: "Compound Interest", description: "Calculate compound interest over time.", category: "Finance Tools", icon: "📈", route: "/tools/compound-interest", tags: ["finance", "interest", "compound"] },
  { id: "simple-interest", name: "Simple Interest", description: "Calculate simple interest on loans or savings.", category: "Finance Tools", icon: "💹", route: "/tools/simple-interest", tags: ["finance", "interest", "simple"] },
  { id: "salary-calculator", name: "Salary Calculator", description: "Break down salary to monthly, weekly, hourly.", category: "Finance Tools", icon: "💰", route: "/tools/salary-calculator", tags: ["salary", "pay", "income"] },
  { id: "vat-calculator", name: "VAT/Tax Calculator", description: "Add or remove VAT/Tax from a price.", category: "Finance Tools", icon: "🧾", route: "/tools/vat-calculator", tags: ["tax", "vat", "finance"] },
  { id: "retirement-calculator", name: "Retirement Calc", description: "Project your retirement savings.", category: "Finance Tools", icon: "🏖️", route: "/tools/retirement-calculator", tags: ["retirement", "savings", "finance"] },

  // Fun & Random
  { id: "random-number", name: "Random Number", description: "Generate random numbers in a range.", category: "Fun & Random", icon: "🎲", route: "/tools/random-number", tags: ["random", "number", "generator"] },
  { id: "coin-flipper", name: "Coin Flipper", description: "Flip a virtual coin for heads or tails.", category: "Fun & Random", icon: "🪙", route: "/tools/coin-flipper", tags: ["coin", "flip", "random"] },
  { id: "dice-roller", name: "Dice Roller", description: "Roll virtual dice (D4, D6, D20, etc).", category: "Fun & Random", icon: "🎲", route: "/tools/dice-roller", tags: ["dice", "roll", "rpg"] },
  { id: "random-name-picker", name: "Random Name Picker", description: "Pick a random winner from a list of names.", category: "Fun & Random", icon: "🏆", route: "/tools/random-name-picker", tags: ["name", "picker", "winner", "random"] },
  { id: "yes-no", name: "Yes or No", description: "Let the computer decide yes or no.", category: "Fun & Random", icon: "👍", route: "/tools/yes-no", tags: ["yes", "no", "decision"] },
  { id: "color-name-finder", name: "Color Name Finder", description: "Find the closest named color to a hex code.", category: "Fun & Random", icon: "🎨", route: "/tools/color-name-finder", tags: ["color", "name", "hex"] },
  { id: "random-color", name: "Random Color", description: "Generate random beautiful colors.", category: "Fun & Random", icon: "🌈", route: "/tools/random-color", tags: ["color", "random", "generator"] },

  // Productivity
  { id: "todo-list", name: "To-Do List", description: "A simple, persistent task manager.", category: "Productivity", icon: "✅", route: "/tools/todo-list", tags: ["todo", "task", "manager"] },
  { id: "pomodoro-timer", name: "Pomodoro Timer", description: "Focus timer with work and break intervals.", category: "Productivity", icon: "🍅", route: "/tools/pomodoro-timer", tags: ["pomodoro", "timer", "focus"] },
  { id: "notes-pad", name: "Notes Pad", description: "Quick notepad that auto-saves to your browser.", category: "Productivity", icon: "🗒️", route: "/tools/notes-pad", tags: ["notes", "pad", "text"] },
  { id: "word-frequency", name: "Word Frequency", description: "Find the most used words in a text.", category: "Productivity", icon: "📊", route: "/tools/word-frequency", tags: ["word", "frequency", "text"] },
  { id: "text-to-speech", name: "Text to Speech", description: "Convert text to spoken audio in your browser.", category: "Productivity", icon: "🗣️", route: "/tools/text-to-speech", tags: ["speech", "audio", "text"] },
  { id: "speech-to-text", name: "Speech to Text", description: "Transcribe your voice to text using the mic.", category: "Productivity", icon: "🎤", route: "/tools/speech-to-text", tags: ["speech", "text", "voice"] }
];
