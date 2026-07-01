import "../styles/style.css";
import { useState, useEffect, useRef, useCallback } from "react";

    // ─── CONSTANTS ─────────────────────────────────────────────────────────────
    const BOOT_EXTENSIONS = [
    "Loading Mai OS kernel…",
    "Drinking coffee...",
    "Mounting disks…",
    "Bootstrapping…",
    "Starting maiTunes daemon…",
    "Playing tennis…",
    "Eating a sandwich…",
    "Almost ready…",
    ];

    const INITIAL_WINDOWS = {
    about:    { id: "about",    title: "About This OS",  open: false, x: 120, y: 50,  w: 360, zIndex: 51 },
    stickies: { id: "stickies", title: "Stickies",     open: false, x: 60,  y: 300, w: 220, zIndex: 50 },
    news:     { id: "news",     title: "resume.txt",  open: false, x: 540, y: 100, w: 400, zIndex: 50 },
    dungeon:  { id: "dungeon",  title: "Dungeon Escape",  open: false, x: 350, y: 90,  w: 500, zIndex: 50 },
    settings: { id: "settings", title: "Appearance", open: false, x: 400, y: 200, w: 600, zIndex: 50 }
    };

    // ─── SUB-COMPONENTS ────────────────────────────────────────────────────────
    function LoginScreen({ onLogin, onShutdown, clock }) {
        
        const [showHelp, setShowHelp] = useState(false);

        return (
            <div className="maios-boot" style={{ gap: 16, zIndex: 900 }}>

                {/* Simple menubar */}
                <div className="maios-menubar" style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                    <div className="menubar-apple">
                    <img src="/resources/favicons/CompactDisc.ico" alt="menu" style={{ width: 16, height: 16 }} />
                    </div>
                    <div className="menu-item" onClick={() => setShowHelp(h => !h)}>Help</div>
                    <div className="menubar-right">{clock}</div>
                </div>

                {/* Help popup */}
                {showHelp && (
                    <div style={{
                        position: "absolute", top: 28, left: 60,
                        background: "#ffffcc",
                        border: "1px solid #888",
                        boxShadow: "2px 2px 0 #000",
                        padding: "6px 10px",
                        fontFamily: "Geneva, monospace",
                        fontSize: 20,
                        zIndex: 200,
                    }}>
                    💡 Hint: Click 'Guest' to log in.
                    </div>
                )}

                <div className="login-box">
                    <img src="/resources/favicons/CompactDisc.ico" style={{ width: 40, marginBottom: -6 }} alt="logo" />
                    <div style={{ fontSize: 38, fontFamily: "Garamond Light", color: "#000", letterSpacing: -1}}>
                        Welcome to Mai OS
                    </div>

                    {/* user list */}
                    <div className="user-list" style={{
                        width: 230, height: 200 , border: "3px solid #d04ea9",
                        background: "#fff", fontFamily: "Chicago, monospace", fontSize: 22
                    }}>
                        <div className="user-b"
                        onClick={onLogin}
                        style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "6px 10px",
                        }}
                        >
                        <span style={{ fontSize: 24 }}>🧸</span>
                        <span style={{ fontWeight: "bold" }}>Guest</span>
                        </div>
                    </div>

                {/* bottom buttons */}
                <div style={{ display: "flex", gap: 44, marginTop: 8 }}>
                    <div
                        onClick={onShutdown}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                    >
                        <div style={{
                            width: 34, height: 34,
                            background: "linear-gradient(to bottom, #e0e0e0, #c0c0c0)",
                            border: "2px solid #888",
                            boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20,
                        }}>⏻</div>
                        <div style={{ fontSize: 15, fontFamily: "Chicago", color: "#333", fontWeight: "bold" }}>Shutdown</div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
    
    function HappyMac() {
    return (
        <div className="boot-happy-mac">
        <div className="mac-screen-inner">
            <div className="mac-face">
            <div className="mac-eyes">
                <div className="mac-eye" />
                <div className="mac-eye" />
            </div>
            <div className="mac-smile" />
            </div>
        </div>
        <div className="mac-base" />
        </div>
    );
    }

    function AboutContent() {
        const [siteInfo, setSiteInfo] = useState(null);

    useEffect(() => {
    const url = "https://neocities.org/api/info?sitename=mai-os";
    fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
        .then(r => r.json())
        .then(data => setSiteInfo(data.info))
        .catch(() => {});
    }, []);


    return (
        <div className="about-inner">
        <div className="about-logo"><img src="/resources/favicons/CompactDisc.ico" alt="" />Mai<span>OS</span>1.0</div>
        <div className="about-specs">
            <b>Version:</b> Mai OS 1.0.1<br />
            <b>Tech Stack:</b> React<br />
            <b>Host Platform:</b> Neocities<br />
            <b>Mai OS Users:</b> {siteInfo ? siteInfo.hits.toLocaleString() : "…"}<br />
            <b>Last Updated:</b> {siteInfo ? new Date(siteInfo.last_updated).toLocaleDateString() : "…"}<br />
        </div>
        <div className="about-divider" />
        <div style={{ fontSize: 13, color: "#555", fontFamily: "Geneva, monospace", textAlign: "center" }}>
            Created by Maija Grimes, with help from Anthropic's Claude.<br />
            Inspired by Apple.
        </div>
        </div>
    );
    }

    function StickiesContent() {
    return (
        <div className="stickies-body" style={{ height: "100%" }}>
        📌 update portfolio !<br />
        📌 finish the maiOS site<br />
        📌 <s>drink coffee</s> ✓<br />
        📌 listen to that album<br /><br />
        <em style={{ color: "#888", fontSize: 14 }}>— note to self: get more sleep</em>
        </div>
    );
    }

    function DungeonEscape() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <iframe
            src="https://maijagrimes.github.io/dungeon-escape-wasm/DungeonEscapeQt.html"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Dungeon Escape"
            allow="cross-origin-isolated"
            />
        </div>
    );
    }

    function SettingsContent({ openWindow, setWallpaper }) {
    const wallpapers = [
        { src: "/resources/images/Strawberry-Parabola.jpg",       alt: "Pink" },
        { src: "/resources/images/Tangerine-Fusion.jpg",    alt: "Orange" },
        { src: "/resources/images/Lime-Horizon.jpg", alt: "Green" },
        { src: "/resources/images/Grape-Mission.jpg",   alt: "Purple" },
        { src: "/resources/images/Blueberry-Union.jpg",   alt: "Blue" },
    ];

    return (
        <div className="settings-body">
            <h2>Background</h2>
            <div className="settings-backgrounds">
                {wallpapers.map(wp => (
                <button key={wp.src} onClick={() => setWallpaper(wp.src)} type="button">
                    <img src={wp.src} alt={wp.alt} />
                </button>
                ))}
            </div>
        </div>
    );
    }

    function NewsContent() {
    /*const items = [
        { tag: "Breaking", title: "Local Designer Completes Personal Site, Sources Say", sub: "Experts call it 'a moment.' The site is reportedly very cool." },
        { tag: "Tech",     title: "maiOS 1.0 Ships — No Bugs Detected (Allegedly)",      sub: "Engineers celebrate with iced coffee and a playlist." },
        { tag: "Culture",  title: "Maija Names Favorite Camera — Film Community Shaken",  sub: "The Panasonic vs Canon debate continues. No comment from sources." },
        { tag: "Music",    title: "maiTunes Library Reaches Critical Mass",               sub: "'There's a lot of good stuff in there,' anonymous source confirms." },
    ];*/
    return (
        /*<div className="news-inner">
        <div className="news-masthead">
            <div className="news-masthead-title">maiOS Hot News</div>
            <div className="news-masthead-sub">The latest from Maija HQ</div>
        </div>
        {items.map((item, i) => (
            <div className="news-item" key={i}>
            <span className="news-tag">{item.tag}</span>
            <div className="news-title">{item.title}</div>
            <div className="news-sub">{item.sub}</div>
            </div>
        ))}
        </div>*/
        <div className="textbox">
            <h1>Maija Grimes</h1>
            <h2>Education</h2>
            <h3>University of Colorado at Boulder</h3>
            <p>Bachelor's Degree: Computer Science</p>
            <p>Minor: Communication</p>
            <p>Involvement: Society of Women Engineers</p>
            <h3>Hermantown High School</h3>
            <p>High School Diploma</p>
            <p>Involvement: Yearbook Editor</p>
            <h2>Work Experience</h2>
            <h3>IT Service Center - CU Boulder</h3>
            <p>Identity & Access Management Analyst</p>
            <p>July 2024 - Present</p>
            <h3>National Center for Women & Information Technology</h3>
            <p>Data & Membership Analyst</p>
            <p>July 2024 - May 2025</p>
            <h3>Michael's Stores</h3>
            <p>Sales Associate</p>
            <p>June 2023 - Aug. 2023</p>
            <h2>Projects</h2>
            <p>Coming soon...
            <span style={{
                display: "inline-block",
                width: 1, height: 10,
                background: "#000",
                marginLeft: 5,
                verticalAlign: "text-center",
                animation: "blink 1.5s step-end infinite",
            }} /></p>
        </div>
    );
    }

    // ─── WINDOW ────────────────────────────────────────────────────────────────
    function Window({ win, isFront, onClose, onFocus, onDragStart, bodyStyle, openWindow, setWallpaper, setCursorStyle }) {
    const isStickies = win.id === "stickies";

    return (
        <div
        className={`maios-window${isFront ? "" : " unfocused"}`}
        style={{ width: win.w, zIndex: win.zIndex }}
        onMouseDown={() => onFocus(win.id)}
        >
        <div
            className={`window-titlebar${isStickies ? " stickies-titlebar" : ""}`}
            onMouseDown={(e) => onDragStart(e, win.id)}
        >
            <div className="window-close" onClick={() => onClose(win.id)}>✕</div>
            <div className={`window-title${isStickies ? " stickies-title" : ""}`}>{win.title}</div>
        </div>
        <div className="window-body" style={bodyStyle}>
            {win.id === "about"    && <AboutContent />}
            {win.id === "stickies" && <StickiesContent />}
            {win.id === "news"     && <NewsContent />}
            {win.id === "dungeon"  && <DungeonEscape />}
            {win.id === "settings" && <SettingsContent 
                openWindow={openWindow} 
                setWallpaper={setWallpaper} />}
        </div>
        </div>
    );
    }

    // ─── MAIN COMPONENT ────────────────────────────────────────────────────────
    export default function MaiOS() {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 700;

    // Boot state
    const [bootPhase, setBootPhase]   = useState("login");
    const [bootExtIdx, setBootExtIdx] = useState(0);
    const [bootPct, setBootPct]       = useState(0);
    const [bootLabel, setBootLabel]   = useState("Starting up…");

    // Desktop state
    const [desktopVisible, setDesktopVisible] = useState(false);
    const [windows, setWindows] = useState(INITIAL_WINDOWS);
    const [frontId, setFrontId] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [appleOpen, setAppleOpen] = useState(false);
    const [clock, setClock] = useState("");
    const [wallpaper, setWallpaper] = useState("/resources/images/Strawberry-Parabola.jpg");
    const [cursorStyle, setCursorStyle] = useState("/resources/cursors/windows-xp-silver-remastered-/XP Normal (Blue Flower).cur");
    const zCounter = useRef(60);

    // Shutdown state
    const [showShutdownConfirm, setShowShutdownConfirm] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);

    // ── Shutdown ──
    const triggerShutdown = () => {
    setShowShutdownConfirm(false);
    setFadingOut(true);
    setTimeout(() => {
        setFadingOut(false);
        setDesktopVisible(false);
        setWindows(INITIAL_WINDOWS);
        setBootPhase("shutdown");
    }, 1);
    };

    // Clock
    useEffect(() => {
        const tick = () => {
        const now = new Date();
        let h = now.getHours(), m = now.getMinutes();
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        setClock(`${h}:${String(m).padStart(2, "0")} ${ampm}`);
        };
        tick();
        const id = setInterval(tick, 10000);
        return () => clearInterval(id);
    }, []);

    // Boot sequence
    useEffect(() => {
        if (isMobile || bootPhase !== "booting") return;
        let idx = 0;

        const step = () => {
        if (idx < BOOT_EXTENSIONS.length) {
            setBootExtIdx(idx);
            setBootPct(Math.round((idx + 1) / BOOT_EXTENSIONS.length * 100));
            idx++;
            const delay = idx === BOOT_EXTENSIONS.length ? 800 : 180 + Math.random() * 220;
            setTimeout(step, delay);
        } else {
            setBootLabel("Welcome to maiOS!");
            setTimeout(() => {
                const audio = new Audio("/resources/sounds/lovelyboot1.mp3");
                audio.play();
                setBootPhase("done");
                setDesktopVisible(false);
                setTimeout(() => {
                    setDesktopVisible(true);
                    // open windows with stagger
                    setTimeout(() => openWindow("about"),    100);
                    setTimeout(() => openWindow("news"),     300);
                    setTimeout(() => openWindow("stickies"), 500);
                }, 100);
                setTimeout(() => setBootPhase("hidden"), 900);
            }, 2500);
        }
        };

        const init = setTimeout(step, 600);
        return () => clearTimeout(init);
    }, [bootPhase]); // eslint-disable-line

    // ── Window helpers ──
    const openWindow = useCallback((id) => {
        zCounter.current += 1;
        const z = zCounter.current;
        setWindows(prev => ({
        ...prev,
        [id]: { ...prev[id], open: true, zIndex: z },
        }));
        setFrontId(id);
    }, []);

    const closeWindow = useCallback((id) => {
        setWindows(prev => ({ ...prev, [id]: { ...prev[id], open: false } }));
        if (frontId === id) setFrontId(null);
    }, [frontId]);

    const focusWindow = useCallback((id) => {
        zCounter.current += 1;
        setWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: zCounter.current } }));
        setFrontId(id);
    }, []);

    // ── Drag ──
    const dragRef = useRef(null);

    const windowsRef = useRef(windows);
    useEffect(() => { windowsRef.current = windows; }, [windows]);

    const startDrag = useCallback((e, id) => {
        e.preventDefault();
        focusWindow(id);

        const { x, y } = windowsRef.current[id];
        const offsetX = e.clientX - x;
        const offsetY = e.clientY - y;        

        dragRef.current = { id, offsetX, offsetY };
        document.body.style.cursor = "grabbing";

        const onMove = (e) => {
            if (!dragRef.current) return;
            const { id, offsetX, offsetY } = dragRef.current;
            setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], x: e.clientX - offsetX, y: e.clientY - offsetY },
            }));
        };
        const onUp = () => {
            dragRef.current = null;
            document.body.style.cursor = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }, [focusWindow]);

    // ── Mobile ──
    if (isMobile) {
        return (
        <div className="maios-root">
            <div className="maios-mobile">
            <div className="mobile-dialog">
                <div className="mobile-bar">⚠ maiOS</div>
                <div className="mobile-body">
                <div className="mobile-icon">🖥️</div>
                <strong>maiOS requires a larger screen.</strong><br /><br />
                This site is optimized for desktop viewing.<br />
                Please switch to a computer for the full experience!
                <br /><br />
                <em style={{ fontSize: 10, color: "#555" }}>— a maiOS System Alert —</em>
                <button className="mobile-ok">OK</button>
                </div>
            </div>
            </div>
        </div>
        );
    }

    const desktopIcons = [
        { id: "about",     emoji: "💻", label: "About" },
        { id: "settings",  emoji: "⚙️", label: "Settings" },
        { id: "news",      emoji: "🗒️", label: "resume.txt" },
        { id: "stickies",  emoji: "📒", label: "Stickies" },
        { id: "trash",     emoji: "🗑️", label: "Trash",   action: null },
    ];

    return (
        <div className="maios-root" onClick={() => setAppleOpen(false)}>

        {bootPhase === "login" && (
            <LoginScreen onLogin={() => {
                new Audio("/boot.mp3").play().catch(() => {});
                setBootPhase("booting");
            }} onShutdown={() => setShowShutdownConfirm(true)} clock={clock} />
        )}

        {showShutdownConfirm && (
            <div style={{
                position: "fixed", inset: 0,
                background: "rgba(58, 54, 56, 0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 999,
            }}>
                <div style={{
                background: "#f1efef",
                border: "2px solid #000",
                boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080, 4px 4px 0 #000",
                padding: "24px 32px",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 16, width: 300, textAlign: "center",
                fontFamily: "Geneva, monospace",
                }}>
                <span style={{ fontSize: 28 }}>⏻</span>
                <div style={{ fontFamily: 'Chicago', fontSize: 14, lineHeight: 1.6 }}>
                    <b>Are you sure you want to shut down Mai OS?</b><br />
                    <span style={{ fontSize: 12, color: "#555" }}>Any unsaved changes will be lost.</span>
                </div>
                <div style={{ width: "100%", height: 1, background: "#999" }} />
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="taskbar-btn" style={{ padding: "4px 16px", fontSize: 15 }}
                    onClick={triggerShutdown}>
                    Shut Down
                    </button>                    
                    <button className="taskbar-btn" style={{ padding: "4px 16px", fontSize: 15 }}
                    onClick={() => setShowShutdownConfirm(false)}>
                    Cancel
                    </button>
                </div>
                </div>
            </div>
        )}

        {fadingOut && (
            <div style={{
                position: "fixed", inset: 0,
                background: "#000",
                opacity: 0,
                animation: "fadeToBlack 2.5s ease forwards",
                zIndex: 400,
                pointerEvents: "none",
            }} />
        )}

        {/* Boot */}
        {(bootPhase === "booting" || bootPhase === "done") && (
            <div className={`maios-boot${bootPhase === "done" ? " fade-out" : ""}`}>
            <div className="boot-center">
                <HappyMac />
                <div className="boot-os-text">
                Mai OS
                <span className="boot-version">Version 1.0</span>
                </div>
                <div className="boot-progress-area">
                <div className="boot-ext-label">{BOOT_EXTENSIONS[bootExtIdx]}</div>
                <div className="boot-progress-bar">
                    <div className="boot-progress-fill" style={{ width: `${bootPct}%` }} />
                </div>
                <div className="boot-progress-label">{bootLabel}</div>
                </div>
            </div>
            <div className="boot-copyright">
                Built by Maija Grimes.<br />
            </div>
            </div>
        )}

        {bootPhase === "shutdown" && (
            <div style={{
                position: "fixed", inset: 0,
                background: "#000000",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000
            }}>
                <div style={{
                background: "#eae8e8",
                border: "2px solid #000",
                boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080, 4px 4px 0 #000",
                padding: "24px 32px",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 16, width: 320, textAlign: "center",
                fontFamily: "Chicago, monospace",
                }}>
                <span style={{ fontSize: 32 }}>✨</span>
                <div style={{ fontSize: 25}}>
                    <b>Goodbye!</b><br /><br />
                    <p style={{ fontSize: 13, color: "#555" }}>— come back soon! —</p>
                </div>
                <div style={{ width: "100%", height: 1, background: "#999" }} />
                <div
                    onClick={() => {
                        setDesktopVisible(false);
                        setWindows(INITIAL_WINDOWS);
                        setBootExtIdx(0);
                        setBootPct(0);
                        setBootLabel("Starting up…");
                        setBootPhase("login");
                        }}
                    style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4
                    }}
                >
                    <div style={{
                    width: 44, height: 44,
                    background: "linear-gradient(to bottom, #e0e0e0, #c0c0c0)",
                    border: "2px solid #888",
                    boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                    }}>⏻</div>
                    <div style={{ fontSize: 11, color: "#333"  }}>Power On</div>
                </div>
                </div>
            </div>
        )} 

        {/* Desktop */}
        <div className={`maios-desktop${desktopVisible ? " visible" : ""}`} style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: "cover" }}>

            {/* Menu bar */}
            <div className="maios-menubar">
            <div
                className="menubar-apple"
                onClick={(e) => { e.stopPropagation(); setAppleOpen(o => !o); }}
            ><img src="/resources/favicons/CompactDisc.ico" alt="menu" style={{ width: 16, height: 16 }} /></div>
            <div className="menu-item" onClick={() => openWindow("about")}>About</div>
            {/*<div className="menu-item" onClick={() => openWindow("news")}>Hot News</div>*/}
            <div className="menu-item" onClick={() => openWindow("stickies")}>Stickies</div>
            {/*<div className="menu-item">Portfolio</div>
            <div className="menu-item">Contact</div>*/}
            <div className="menubar-right">{clock}</div>
            </div>

            {/* Apple dropdown */}
            {appleOpen && (
            <div className="apple-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="apple-menu-item" onClick={() => { openWindow("about"); setAppleOpen(false); }}>💻 About maiOS…</div>
                <div className="apple-menu-sep" />
                <div className="apple-menu-item" onClick={() => { openWindow("settings"); setAppleOpen(false); }}>⚙️ Settings</div>
                {/*<div className="apple-menu-item">🎵 maiTunes</div>
                <div className="apple-menu-item">📷 Photos</div>*/}
                <div className="apple-menu-sep" />
                <div className="apple-menu-item" onClick={() => { setAppleOpen(false); setShowShutdownConfirm(true); }}>💤 Shutdown</div>
                <div className="apple-menu-item" onClick={() => window.location.reload()}>🔄 Restart…</div>
            </div>
            )}

            {/* Desktop area */}
            <div className="desktop-area">
            {/* Icons */}
            {desktopIcons.map((icon, i) => (
                <div
                key={icon.id}
                className={`desktop-icon${selectedIcon === icon.id ? " selected" : ""}`}
                style={{ right: 20, top: 20 + i * 80 }}
                onClick={() => {
                    setSelectedIcon(icon.id);
                    if (icon.id !== "trash") openWindow(icon.id);
                }}
                >
                <div className="icon-img">{icon.emoji}</div>
                <div className="icon-label">{icon.label}</div>
                </div>
            ))}

            {/* Windows */}
            {Object.values(windows).filter(w => w.open).map(win => (
                <div key={win.id} data-winid={win.id} style={{ position: "absolute", left: win.x, top: win.y, zIndex: win.zIndex }}>
                <Window
                    win={win}
                    isFront={frontId === win.id}
                    onClose={closeWindow}
                    onFocus={focusWindow}
                    onDragStart={startDrag}
                    openWindow={openWindow}
                    setWallpaper={setWallpaper}
                    setCursorStyle={setCursorStyle}
                    bodyStyle={
                        win.id === "stickies" ? { margin: 0, border: "none", background: "#ffff99" } : 
                        win.id === "news" ? { height: 200, overflowY: "scroll" } :
                        win.id === "dungeon"  ? { height: 350, minHeight: 350, padding: 0, overflow: "hidden", flex: "none" } :
                        win.id === "settings" ? { height: 350 } :
                        undefined
                    }
                />
                </div>
            ))}
            </div>

            {/* Taskbar */}
            <div className="maios-taskbar">
            {/*<button className="taskbar-btn" onClick={() => openWindow("about")}>💻 About maiOS</button>
            <button className="taskbar-btn" onClick={() => openWindow("news")}>📰 Hot News</button>
            <button className="taskbar-btn" onClick={() => openWindow("stickies")}>🗒️ Stickies</button>*/}
            <div className="taskbar-right">maiOS 1.0 ✦ Maija Computer Inc.</div>
            </div>
        </div>
        </div>
    );
        /*<!--cursor trail from: http://www.mf2fm.com/rv/dhtmltinkerbell.php -->
        <!--ChiKareGo2 (chicago) font from: http://www.suppertime.co.uk/blogmywiki/2017/04/chicago/ -->
        <!--FindersKeepers (geneva) font from: http://www.suppertime.co.uk/blogmywiki/2017/04/finderskeepers/ -->
        <!--Apple Garamond font from: https://www.dafont.com/apple-garamond.font -->
        <!--old Mac cursors from: https://www.rw-designer.com/cursor-set/old-macos-win10-11#google_vignette -->
        <!--silver Windows cursors from: https://www.rw-designer.com/cursor-set/windows-xp-silver-remastered- -->
            startup sound fx from : Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=103697">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=103697">Pixabay</a>
            icon backgrounds from : https://basicappleguy.com/haberdashery/macintoshwallpapers */
}