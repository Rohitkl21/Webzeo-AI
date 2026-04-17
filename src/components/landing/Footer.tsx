import { Logo } from "@/components/Logo";
import { Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-8 h-8" />
              <span className="text-2xl font-bold tracking-tight font-display">Webzeo</span>
            </div>
            <p className="text-text-muted max-w-sm mb-8">
              The next-generation platform for creating, managing, and scaling websites with intelligent AI insights.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-display mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Showcase</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-display mb-6">Stay Updated</h4>
            <p className="text-sm text-text-muted mb-4">Subscribe to our newsletter for the latest AI building tips.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-card border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">© {new Date().getFullYear()} Webzeo Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm text-text-muted font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
