import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  FileText, 
  Search, 
  Clock, 
  CheckCircle,
  Building,
  Users2,
  ArrowRight
} from 'lucide-react';
import './Landing.css';

const text = {
  en: {
    portal: "CivicLink Portal",
    langBtn: "हिंदी में देखें",
    login: "Login",
    register: "Register",
    heroTitle: "Citizen Grievance Redressal Portal",
    heroSub: "A platform for citizens to voice their concerns and get resolution from government authorities",
    fileComp: "File a Complaint",
    trackComp: "Track Your Complaint",
    compFiled: "Complaints Filed",
    issRes: "Issues Resolved",
    depts: "Departments",
    citSer: "Citizens Served",
    bannerTitle: "Your Voice, Our Priority",
    bannerSub: "A platform for citizens to voice their concerns and get resolution from government authorities",
    howItWorks: "How It Works",
    step1: "Submit Complaint",
    step1d: "Register and submit your complaint with all necessary details and images",
    step2: "Track Progress",
    step2d: "Monitor your complaint status in real-time as it moves through the system",
    step3: "Get Resolution",
    step3d: "Receive updates and resolution from the concerned department"
  },
  hi: {
    portal: "सिविकलिंक पोर्टल",
    langBtn: "View in English",
    login: "लॉग इन",
    register: "पंजीकरण",
    heroTitle: "सार्वजनिक शिकायत निवारण पोर्टल",
    heroSub: "नागरिकों को अपनी चिंताओं को व्यक्त करने और सरकारी अधिकारियों से समाधान पाने के लिए एक मंच",
    fileComp: "शिकायत दर्ज करें",
    trackComp: "स्थिति ट्रैक करें",
    compFiled: "शिकायतें दर्ज",
    issRes: "समस्याएं हल",
    depts: "विभाग",
    citSer: "नागरिकों की सेवा",
    bannerTitle: "आपकी आवाज़, हमारी प्राथमिकता",
    bannerSub: "नागरिकों को अपनी चिंताओं को व्यक्त करने और सरकारी अधिकारियों से समाधान पाने के लिए एक मंच",
    howItWorks: "यह कैसे काम करता है",
    step1: "शिकायत दर्ज करें",
    step1d: "सभी आवश्यक विवरण और छवियों के साथ अपनी शिकायत दर्ज करें और जमा करें",
    step2: "प्रगति ट्रैक करें",
    step2d: "सिस्टम के माध्यम से अपनी शिकायत की स्थिति की वास्तविक समय में निगरानी करें",
    step3: "समाधान पाएं",
    step3d: "संबंधित विभाग से अपडेट और समाधान प्राप्त करें"
  }
};

const Landing = () => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');
  const t = text[lang];

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo-container">
          <span className="logo-badge">CL</span>
          <span>{t.portal}</span>
        </div>
        <div className="header-actions">
          <button className="lang-btn" onClick={toggleLang}>
            <Globe size={18} />
            {t.langBtn}
          </button>
          <Link to="/login" className="login-link">{t.login}</Link>
          <Link to="/register" className="register-btn">{t.register}</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">{t.heroTitle}</h1>
        <p className="hero-subtitle">{t.heroSub}</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">
            <FileText size={20} />
            {t.fileComp}
          </Link>
          <Link to="/login" className="btn-secondary">
            <Search size={20} />
            {t.trackComp}
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">{t.howItWorks}</h2>
        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-icon-wrapper icon-green" style={{ color: '#0d5c2c' }}>
              <FileText />
            </div>
            <div className="step-number" style={{ color: '#0d5c2c' }}>1</div>
            <h3 className="step-title">{t.step1}</h3>
            <p className="step-desc">{t.step1d}</p>
          </div>
          
          {/* Step 2 */}
          <div className="step-card">
            <div className="step-icon-wrapper icon-red" style={{ color: '#c53030' }}>
              <Clock />
            </div>
            <div className="step-number" style={{ color: '#c53030' }}>2</div>
            <h3 className="step-title">{t.step2}</h3>
            <p className="step-desc">{t.step2d}</p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-icon-wrapper icon-green" style={{ color: '#059669' }}>
              <CheckCircle />
            </div>
            <div className="step-number" style={{ color: '#059669' }}>3</div>
            <h3 className="step-title">{t.step3}</h3>
            <p className="step-desc">{t.step3d}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-icon icon-green">
            <FileText size={24} />
          </div>
          <div className="stat-value">10,000+</div>
          <div className="stat-label">{t.compFiled}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon icon-green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-value">8,500+</div>
          <div className="stat-label">{t.issRes}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon icon-red">
            <Building size={24} />
          </div>
          <div className="stat-value">5</div>
          <div className="stat-label">{t.depts}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon icon-blue">
            <Users2 size={24} />
          </div>
          <div className="stat-value">5,000+</div>
          <div className="stat-label">{t.citSer}</div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="banner-section">
        <h2 className="banner-title">{t.bannerTitle}</h2>
        <p className="banner-subtitle">{t.bannerSub}</p>
        <Link to="/register" className="banner-btn">
          {t.fileComp} <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default Landing;
