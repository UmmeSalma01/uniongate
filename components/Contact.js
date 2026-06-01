export default function Contact(){
  return (
    <footer id="contact" className="py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <img src="/images/logo.png" alt="logo" className="h-14 mb-4" />
          <p className="text-gray-300 font-semibold">Union Gate Trading Establishment</p>
          <p className="text-gray-400">Riyadh, Kingdom of Saudi Arabia</p>
          <p className="text-gray-400">Hamza bin Abdul Mutalib Street 8546, Riyadh, District West Al-Oraija, Saudi Arabia</p>
          <p className="mt-2 text-gold font-semibold">Phone: <a className="text-gold" href="tel:+966538632946">+966 538 632 946</a></p>
          <p className="text-gray-300">Email: <a className="text-gray-100 font-semibold" href="mailto:uniongatetrading007@gmail.com">uniongatetrading007@gmail.com</a></p>
          <p className="mt-2 text-gray-300">Follow us: <a className="text-gray-100 font-semibold ml-2" href="https://www.instagram.com/uniongatetrading?igsh=MWlyM2I3aTRvaGs3MA==" target="_blank" rel="noopener noreferrer">Instagram</a> <span className="mx-2">|</span> <a className="text-gray-100 font-semibold" href="https://www.facebook.com/share/1H7Rb5n32q/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a></p>
        </div>
        <div className="bg-[#0b0b0b] rounded-xl p-6 border border-black/20">
          <h3 className="font-display text-xl text-gold mb-3">Get In Touch</h3>
          <p className="text-gray-300">For enquiries please reach out by phone or email. We respond promptly to project requests and supply inquiries.</p>
        </div>
      </div>
      <div className="mt-12 border-t border-black/30 pt-6 text-center text-gray-400">© Union Gate Trading Establishment — Riyadh, KSA</div>
    </footer>
  )
}
