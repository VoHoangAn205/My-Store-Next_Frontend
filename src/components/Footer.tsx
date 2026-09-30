export default function Footer() {
  return (
    <>
      <footer className="bg-brand-dark text-brand-slate border-t border-brand-sand/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <span className="text-lg font-black tracking-widest text-white">
              HOANGAN<span className="text-brand-rust">.</span>
            </span>
            <p className="mt-4 text-sm text-brand-white leading-relaxed max-w-sm">
              Products in this website are used for showcase and demonstrate
              website features. There are no actual transactions were executed.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-brand-sand uppercase tracking-widest mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  target="_blank"
                  href="https://github.com/VoHoangAn205"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <i className="fa-brands fa-github text-2xl"></i>{" "}
                  <span>GitHub Profile</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.upwork.com/freelancers/~014df6dde93bc975cd?mp_source=share"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <i className="fa-brands fa-square-upwork text-2xl"></i>{" "}
                  <span>Hire on Upwork</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-slate/60 gap-4">
          <p>
            &copy; 2026 HOANGAN Inc. Architectural Sound Labs. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
