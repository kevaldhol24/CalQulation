import { Button } from "@/components/ui/button";

export default function Subscribe() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-md p-4 mb-4">
      <h4 className="text-white text-base font-bold mb-1">Get Financial Updates</h4>
      <p className="text-blue-100 mb-3 text-xs">
        Sign up for our newsletter to receive the latest financial tips.
      </p>
      <form className="flex flex-col">
        <input
          type="email"
          placeholder="Your email address"
          className="px-3 py-1.5 text-sm rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 mb-2 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
        <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-8 text-xs">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
