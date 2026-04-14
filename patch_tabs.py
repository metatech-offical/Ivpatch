import sys

with open(r'c:\Users\vedan\iv-patch\app\profile\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = """            {/* My Orders Tab */}
            {activeTab === "My Orders" && (
              <div className="flex flex-col gap-4 md:gap-6">
                <h2 className="text-[#1A1A1A] text-[20px] font-['Satoshi:Medium',sans-serif] pb-5 border-b border-[#E5E5E5] w-full">My Orders</h2>
                <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center bg-[#f9f9f9] rounded-[12px] border border-dashed border-[#ccc] mt-4">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
                    <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p className="mt-4 text-[#999] text-[20px] font-['Satoshi:Medium',sans-serif]">No orders yet</p>
                </div>
              </div>
            )}"""

replacement1 = """            {/* My Orders Tab */}
            {activeTab === "My Orders" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[20px] font-['Satoshi:Medium',sans-serif] pb-5 border-b border-[#E5E5E5] w-full">My Orders</h2>
                <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center bg-[#f2f2f2] rounded-[16px] mt-6">
                  <img src="/empty-cart.svg" alt="Empty orders" className="w-[120px] h-auto object-contain mx-auto mb-4" />
                  <p className="text-[#1a1a1a] text-[20px] font-['Satoshi:Medium',sans-serif]">No orders yet</p>
                </div>
              </div>
            )}"""

target2 = """            {/* Other tabs */}
            {(activeTab === "Shipping & Return policy" || activeTab === "Help") && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[#1A1A1A] text-[30px] font-['Satoshi:Medium',sans-serif]">{activeTab}</h2>
                <p className="text-[#808080] text-[18px] font-['Satoshi:Regular',sans-serif]">
                  Content coming soon.
                </p>
              </div>
            )}"""

replacement2 = """            {/* Shipping & Return policy Tab */}
            {activeTab === "Shipping & Return policy" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[24px] font-['Satoshi:Medium',sans-serif] pb-6 border-b border-[#E5E5E5] w-full">Shipping & Return policy</h2>
                
                <div className="flex flex-col gap-4 py-8 border-b border-[#E5E5E5]">
                  <h3 className="text-[#4D4D4D] text-[18px] font-['Satoshi:Medium',sans-serif] mb-1">Shipping</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-3 text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] marker:text-[#666]">
                    <li>Orders are processed within 1—3 business days, with delivery in 3—7 days (domestic) and 7—14 days (international)</li>
                    <li>A tracking link is shared once your order is shipped</li>
                    <li>Customs duties or import taxes (if applicable) are the customer's responsibility</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 py-8">
                  <h3 className="text-[#4D4D4D] text-[18px] font-['Satoshi:Medium',sans-serif] mb-1">Returns & Refunds</h3>
                  <ul className="list-disc pl-5 flex flex-col gap-3 text-[#4D4D4D] text-[16px] font-['Satoshi:Regular',sans-serif] marker:text-[#666]">
                    <li>Returns are accepted within 7 days of delivery for items that are unused, unopened, and in original packaging</li>
                    <li>Due to hygiene standards, opened or used products are not eligible for return</li>
                    <li>Refunds are processed within 5—10 business days after inspection.</li>
                    <li>Return shipping costs are borne by the customer unless the product is defective or incorrect.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === "Help" && (
              <div className="flex flex-col w-full">
                <h2 className="text-[#1A1A1A] text-[24px] font-['Satoshi:Medium',sans-serif] pb-6 border-b border-[#E5E5E5] w-full">Help</h2>
                
                <div className="flex flex-col md:flex-row gap-4 py-8 border-b border-[#E5E5E5]">
                   <div className="flex-1 bg-[#f4f4f4] rounded-[16px] p-6 flex flex-col items-start min-h-[140px]">
                     <svg className="mb-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line></svg>
                     <div className="flex flex-col mt-4">
                       <h4 className="text-[#1a1a1a] text-[16px] font-['Satoshi:Bold',sans-serif] leading-tight">Chat to Support</h4>
                       <p className="text-[#666] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1">We're here to help</p>
                       <a href="mailto:Support@lvpatch.com" className="text-[#1a1a1a] text-[15px] font-['Satoshi:Medium',sans-serif] underline decoration-1 underline-offset-2">Support@lvpatch.com</a>
                     </div>
                   </div>
                   <div className="flex-1 bg-[#f4f4f4] rounded-[16px] p-6 flex flex-col items-start min-h-[140px]">
                     <svg className="mb-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                     <div className="flex flex-col mt-4">
                       <h4 className="text-[#1a1a1a] text-[16px] font-['Satoshi:Bold',sans-serif] leading-tight">Call Us</h4>
                       <p className="text-[#666] text-[14px] font-['Satoshi:Regular',sans-serif] mb-1">Mon-Fri from 8am- 5pm</p>
                       <a href="tel:+15550000000" className="text-[#1a1a1a] text-[15px] font-['Satoshi:Medium',sans-serif] underline decoration-1 underline-offset-2">+1 (555) 000 0000</a>
                     </div>
                   </div>
                </div>

                <div className="flex flex-col w-full py-6">
                  <h3 className="text-[#1a1a1a] text-[20px] font-['Satoshi:Regular',sans-serif] mb-5">FAQ's</h3>
                  <div className="flex flex-col gap-3">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className={`border rounded-[10px] overflow-hidden transition-all duration-200 ` + (openFaq === idx ? 'border-[#E5E5E5] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'border-transparent bg-[#f4f4f4]')}>
                        <button 
                          onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
                          className="w-full flex items-center justify-between p-5 text-left transition-colors"
                        >
                          <span className="text-[#1a1a1a] text-[15px] font-['Satoshi:Bold',sans-serif] pr-4 leading-snug">
                            {faq.question}
                          </span>
                          <svg className={`transform transition-transform shrink-0 ` + (openFaq === idx ? "rotate-180" : "")} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        {openFaq === idx && (
                          <div className="px-5 pb-5 pt-1 text-[#4D4D4D] text-[15px] font-['Satoshi:Regular',sans-serif] leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}"""

def normalize(text):
    return '\n'.join(line.rstrip() for line in text.splitlines())

content = normalize(content)
target1 = normalize(target1)
target2 = normalize(target2)

if target1 in content:
    content = content.replace(target1, replacement1)
    print("Replaced target1")
if target2 in content:
    content = content.replace(target2, replacement2)
    print("Replaced target2")

with open(r'c:\Users\vedan\iv-patch\app\profile\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
