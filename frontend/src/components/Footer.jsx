const teamMembers = [
  {
    name: "Sutha (Web Developer)",
    avatar: "/sutha-team-photos.jpeg"
  },
  {
    name: "Abimantra (AI Specialist)",
    avatar: "/sutha-team-photos.jpeg"
  },
  {
    name: "Ferdinand (AI Specialist)",
    avatar: "/sutha-team-photos.jpeg"
  }
];

const Footer = () => {
  return (
    <footer className="border-t border-blue-100 bg-gradient-to-b from-white to-blue-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="DeepVerify Logo" className="w-6 h-6 object-contain" />
              <span className="font-bold text-primary">DeepVerify</span>
            </div>
            <p className="text-slate-600 text-sm max-w-sm">
              An academic research project dedicated to combating misinformation by identifying AI-generated imagery through advanced computer vision techniques.
            </p>
          </div>
          
          {/* Academic Info */}
          <div>
            <h5 className="text-primary font-bold text-sm mb-4">Academic Info</h5>
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              <li>Primakara University</li>
              <li>Class: Artificial Intelligence</li>
              <li>MADE ADI PARAMARTHA PUTRA, S.T., M.T., PH.D.</li>
              <li>December 2025</li>
            </ul>
          </div>
          
          {/* The Team */}
          <div>
            <h5 className="text-primary font-bold text-sm mb-4">The Team</h5>
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              {teamMembers.map((member, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center" 
                      style={{ backgroundImage: `url("${member.avatar}")` }}
                      aria-label={`Avatar of team member ${member.name.split(' ')[0]}`}
                    ></div>
                  </div>
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-blue-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 DeepVerify Project. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="text-slate-500 hover:text-primary text-sm transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-slate-500 hover:text-primary text-sm transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
