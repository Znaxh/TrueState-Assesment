import React from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    HelpCircle,
    LogOut,
    ChevronDown,
    PlayCircle,
    PauseCircle,
    XCircle,
    CheckCircle,
    File
} from 'lucide-react';
import '../components.css';

const Sidebar = () => {
    const [isServicesOpen, setIsServicesOpen] = React.useState(true);
    const [isInvoicesOpen, setIsInvoicesOpen] = React.useState(true);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="user-profile">
                    <div className="avatar">
                        <img src="/vault.png" alt="Vault" />
                    </div>
                    <div className="user-info">
                        <span className="user-name">Vault</span>
                        <span className="user-role">Anurag Yadav</span>
                    </div>
                    <ChevronDown size={16} className="user-menu-icon" />
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-item">
                    <img src="/dashboard.png" alt="Dashboard" className="sidebar-icon" />
                    <span>Dashboard</span>
                </div>
                <div className="nav-item">
                    <img src="/nexus.png" alt="Nexus" className="sidebar-icon" />
                    <span>Nexus</span>
                </div>
                <div className="nav-item">
                    <img src="/intake.png" alt="Intake" className="sidebar-icon" />
                    <span>Intake</span>
                </div>

                <div className="nav-section">
                    <div
                        className="nav-section-header"
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                        <div className="nav-section-title">
                            <img src="/services.png" alt="Services" className="sidebar-icon" />
                            <span>Services</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`section-toggle ${isServicesOpen ? 'rotated' : ''}`}
                        />
                    </div>
                    {isServicesOpen && (
                        <div className="nav-sub-items">
                            <div className="nav-item sub-item">
                                <img src="/intake.png" alt="Pre-active" className="sidebar-icon small" />
                                <span>Pre-active</span>
                            </div>
                            <div className="nav-item sub-item">
                                <img src="/active.png" alt="Active" className="sidebar-icon small" />
                                <span>Active</span>
                            </div>
                            <div className="nav-item sub-item">
                                <img src="/blocked.png" alt="Blocked" className="sidebar-icon small" />
                                <span>Blocked</span>
                            </div>
                            <div className="nav-item sub-item">
                                <img src="/closed.png" alt="Closed" className="sidebar-icon small" />
                                <span>Closed</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="nav-section">
                    <div
                        className="nav-section-header"
                        onClick={() => setIsInvoicesOpen(!isInvoicesOpen)}
                    >
                        <div className="nav-section-title">
                            <img src="/invoices.png" alt="Invoices" className="sidebar-icon" />
                            <span>Invoices</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`section-toggle ${isInvoicesOpen ? 'rotated' : ''}`}
                        />
                    </div>
                    {isInvoicesOpen && (
                        <div className="nav-sub-items">
                            <div className="nav-item sub-item active">
                                <img src="/sub_invoices.png" alt="Proforma Invoices" className="sidebar-icon small" />
                                <span>Proforma Invoices</span>
                            </div>
                            <div className="nav-item sub-item">
                                <img src="/sub_invoices.png" alt="Final Invoices" className="sidebar-icon small" />
                                <span>Final Invoices</span>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
