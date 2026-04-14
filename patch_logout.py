import sys

with open(r'c:\Users\vedan\iv-patch\app\profile\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = "  const [editingProfile, setEditingProfile] = useState(false);"
replacement1 = """  const [editingProfile, setEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);"""

target2 = """                onClick={() => {
                  if (link === "Logout") {
                    logout();
                  } else {
                    setActiveTab(link);
                  }
                }}"""
replacement2 = """                onClick={() => {
                  if (link === "Logout") {
                    setShowLogoutModal(true);
                  } else {
                    setActiveTab(link);
                  }
                }}"""

target3 = """      )}
    </main>
  );
}"""
replacement3 = """      )}

      {/* Logout Pop-up Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[484px] h-[219px] bg-[#555555] rounded-[26px] p-6 flex flex-col relative shadow-2xl">
            <h2 className="text-white text-[20px] font-['Satoshi:Medium',sans-serif] mb-4">Logout</h2>
            <div className="w-full h-[1px] bg-white/10 absolute left-0 top-[60px]" />
            <p className="text-[#EAEAEA] text-[16px] font-['Satoshi:Regular',sans-serif] mt-3">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-between items-center w-full gap-4 mt-auto">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-[52px] bg-[#3B3B3B] hover:bg-[#2A2A2A] text-white rounded-[16px] text-[16px] font-['Satoshi:Medium',sans-serif] transition-colors"
              >
                No, Stay logged In
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="flex-1 h-[52px] bg-[#3B3B3B] hover:bg-[#2A2A2A] text-white rounded-[16px] text-[16px] font-['Satoshi:Medium',sans-serif] transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}"""

# Handle normalizations manually for precise replace
content = content.replace(target1, replacement1)
content = content.replace(target2, replacement2)
content = content.replace(target3, replacement3)

with open(r'c:\Users\vedan\iv-patch\app\profile\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated profile page logic")
