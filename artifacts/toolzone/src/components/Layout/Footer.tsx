import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded primary-gradient flex items-center justify-center font-bold text-white text-xs">
                TZ
              </div>
              <span className="font-bold text-lg text-white">ToolZone</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              The go-to browser-based utility hub for developers, students, and professionals. 
              100+ free tools. Fast, secure, and offline-capable.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/?cat=Web+%26+Dev+Tools" className="hover:text-primary transition-colors">Web & Dev Tools</Link></li>
              <li><Link href="/?cat=Text+Tools" className="hover:text-primary transition-colors">Text Tools</Link></li>
              <li><Link href="/?cat=Image+Tools" className="hover:text-primary transition-colors">Image Tools</Link></li>
              <li><Link href="/?cat=Security+%26+Password" className="hover:text-primary transition-colors">Security Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ToolZone. All rights reserved.</p>
          <p>Built for speed. No data leaves your browser.</p>
        </div>
      </div>
    </footer>
  );
}
