/* global React */
const { useState: useStateAI, useEffect: useEffectAI, useRef: useRefAI } = React;

/* ============================== AI BOOKING HUB ============================== */
/* Floating omni-channel widget — three tabs.
   Channel 3 ("Direct message") is a generic green chat surface, not a brand recreation. */

const AIHub = () => {
  const [open, setOpen] = useStateAI(false);
  const [tab, setTab] = useStateAI("chat"); // chat | voice | direct

  return (
    <>
      {/* Launcher FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Booking Hub"
        style={{
          position: "fixed", right: 28, bottom: 28, zIndex: 70,
          width: 64, height: 64, borderRadius: 999,
          background: "linear-gradient(135deg, var(--brass) 0%, var(--brass-2) 100%)",
          color: "#1a1610",
          border: "none",
          display: "grid", placeItems: "center",
          boxShadow: "0 18px 40px rgba(184,153,104,0.45), 0 0 0 1px rgba(255,255,255,0.18) inset",
          transition: "transform 320ms var(--ease-spring), opacity 240ms",
          transform: open ? "scale(0.5) rotate(-90deg)" : "scale(1)",
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
        }}
      >
        {/* pulse ring */}
        <span style={{
          position: "absolute", inset: 0, borderRadius: 999,
          border: "2px solid var(--brass)",
          animation: "pulse-ring 2.4s var(--ease-out) infinite",
        }} />
        <Icon name="sparkle" size={26} stroke={1.8} />
      </button>

      {/* Panel */}
      <div style={{
        position: "fixed", right: 24, bottom: 24, zIndex: 70,
        width: 400, maxWidth: "calc(100vw - 32px)",
        height: 620, maxHeight: "calc(100vh - 48px)",
        borderRadius: "var(--r-xl)",
        background: "var(--glass-bg-strong)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        border: "1px solid var(--glass-bd)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "transform 380ms var(--ease-spring), opacity 280ms",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, var(--brass), var(--pine))",
              display: "grid", placeItems: "center", color: "#1a1610",
            }}>
              <Icon name="sparkle" size={18} stroke={1.8} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Booking concierge</div>
              <div style={{ fontSize: 11, color: "var(--ink-dim)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#7bd96f", boxShadow: "0 0 8px #7bd96f", animation: "pulse-dot 1.8s infinite" }} />
                Online · avg reply 38s
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            width: 30, height: 30, borderRadius: 999, border: "1px solid var(--line-2)",
            background: "transparent", color: "var(--ink)", display: "grid", placeItems: "center",
          }}><Icon name="x" size={14} /></button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, padding: "12px 16px 0" }}>
          {[
            { k: "chat", icon: "chat", label: "Ask AI" },
            { k: "voice", icon: "mic", label: "Voice" },
            { k: "direct", icon: "whatsapp", label: "Message" },
          ].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10,
              border: "1px solid",
              borderColor: tab === t.k ? "var(--brass)" : "var(--line)",
              background: tab === t.k ? "rgba(184,153,104,0.10)" : "transparent",
              color: tab === t.k ? "var(--brass)" : "var(--ink-mute)",
              fontSize: 12, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "all 220ms",
            }}>
              <Icon name={t.icon} size={13} /> {t.label}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {tab === "chat" && <ChatTab />}
          {tab === "voice" && <VoiceTab />}
          {tab === "direct" && <DirectTab />}
        </div>
      </div>
    </>
  );
};

/* ---------------- CHAT TAB ---------------- */
const SAMPLE_THREAD = [
  { from: "ai", text: "Salaam — I'm the cottage concierge. Ask about rates, weather, the chef, or the road from Islamabad." },
  { from: "user", text: "What's the suite for two adults + a 6 year old, mid-July?" },
  { from: "ai", text: "Suite 04 (Cedar Loft) is the right call — a separate alcove for the little one, west-facing deck.\n\n• 3 nights, Jul 12–15 → ₨ 184,500\n• Includes breakfast, fireplace setup, late checkout\n• Chef Imran available Sat eve (+₨ 8,500)\n\nWant me to soft-hold those dates for 48 hours?", quick: ["Hold dates", "Show suite", "Ask about food"] },
];

const ChatTab = () => {
  const [thread, setThread] = useStateAI(SAMPLE_THREAD);
  const [draft, setDraft] = useStateAI("");
  const [typing, setTyping] = useStateAI(false);
  const scrollRef = useRefAI(null);

  useEffectAI(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [thread, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    setThread(t => [...t, { from: "user", text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setThread(t => [...t, {
        from: "ai",
        text: "Got it — pulling availability now. One sec.",
        quick: ["See live rates", "WhatsApp the host"],
      }]);
    }, 1400);
  };

  return (
    <>
      <div ref={scrollRef} className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {thread.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === "user" ? "flex-end" : "flex-start",
            maxWidth: "82%",
          }}>
            <div style={{
              padding: "11px 14px",
              borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.from === "user" ? "var(--brass)" : "var(--surface)",
              color: m.from === "user" ? "#1a1610" : "var(--ink)",
              fontSize: 13.5, lineHeight: 1.5,
              border: m.from === "ai" ? "1px solid var(--line)" : "none",
              whiteSpace: "pre-wrap",
            }}>{m.text}</div>
            {m.quick && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {m.quick.map((q, j) => (
                  <button key={j} onClick={() => send(q)} style={{
                    padding: "6px 11px", borderRadius: 999,
                    border: "1px solid var(--line-2)", background: "transparent",
                    color: "var(--ink-mute)", fontSize: 11.5, fontWeight: 500,
                  }}>{q}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 4, padding: "12px 14px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--line)" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, borderRadius: 999, background: "var(--ink-dim)",
                animation: `pulse-dot 1.2s ${i*120}ms infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center",
          padding: "8px 8px 8px 14px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 999,
        }}>
          <input
            value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(draft)}
            placeholder="Ask about dates, food, the weather…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--ink)", fontSize: 13.5 }}
          />
          <button onClick={() => send(draft)} style={{
            width: 34, height: 34, borderRadius: 999, border: "none",
            background: "var(--brass)", color: "#1a1610",
            display: "grid", placeItems: "center",
          }}><Icon name="send" size={14} /></button>
        </div>
        <div style={{ fontSize: 10, color: "var(--ink-dim)", marginTop: 8, textAlign: "center", fontFamily: "var(--f-mono)" }}>
          RAG · trained on property docs, weather, road status · responses are estimates
        </div>
      </div>
    </>
  );
};

/* ---------------- VOICE TAB ---------------- */
const VoiceTab = () => {
  const [listening, setListening] = useStateAI(false);
  const [time, setTime] = useStateAI(0);
  useEffectAI(() => {
    if (!listening) return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [listening]);

  const m = String(Math.floor(time/60)).padStart(2,"0");
  const s = String(time%60).padStart(2,"0");

  return (
    <div style={{ flex: 1, padding: "28px 22px", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center" }}>
        <div className="eyebrow" style={{ color: "var(--brass)" }}>Voice agent · beta</div>
        <h3 className="display" style={{ fontSize: 28, margin: "10px 0 4px" }}>
          {listening ? "Listening…" : "Hold a real conversation."}
        </h3>
        <p style={{ fontSize: 13, color: "var(--ink-mute)", maxWidth: 320, margin: "0 auto" }}>
          {listening
            ? "Speak naturally — I'll book, hold, or escalate to the host."
            : "Tap to start. I can quote rates, hold dates, and triage anything I can't."}
        </p>
      </div>

      {/* Big mic */}
      <div style={{ flex: 1, display: "grid", placeItems: "center", position: "relative", margin: "20px 0" }}>
        {listening && (
          <>
            <span style={{
              position: "absolute", width: 200, height: 200, borderRadius: 999,
              background: "radial-gradient(circle, rgba(184,153,104,0.18), transparent 70%)",
              animation: "pulse-dot 2.4s ease-in-out infinite",
            }} />
            <span style={{
              position: "absolute", width: 160, height: 160, borderRadius: 999,
              border: "1.5px solid var(--brass)",
              animation: "pulse-ring 2.2s ease-out infinite",
            }} />
            <span style={{
              position: "absolute", width: 160, height: 160, borderRadius: 999,
              border: "1.5px solid var(--brass)",
              animation: "pulse-ring 2.2s ease-out 0.7s infinite",
            }} />
          </>
        )}
        <button
          onClick={() => { setListening(l => !l); if (listening) setTime(0); }}
          aria-label={listening ? "Stop" : "Start voice"}
          style={{
            width: 116, height: 116, borderRadius: 999,
            border: "none",
            background: listening
              ? "linear-gradient(135deg, var(--brass), var(--rose))"
              : "linear-gradient(135deg, var(--brass), var(--brass-2))",
            color: "#1a1610",
            display: "grid", placeItems: "center",
            boxShadow: "0 18px 50px rgba(184,153,104,0.5)",
            position: "relative",
            transition: "transform 220ms",
          }}>
          <Icon name={listening ? "waveform" : "mic"} size={42} stroke={1.6} />
        </button>
      </div>

      {/* Status + timer */}
      <div style={{
        padding: 14, borderRadius: 14,
        background: "var(--surface)",
        border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 8, height: 8, borderRadius: 999,
            background: listening ? "#ef6754" : "var(--ink-dim)",
            animation: listening ? "pulse-dot 1.2s infinite" : "none",
          }} />
          <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{listening ? "Recording" : "Idle"}</span>
        </div>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--ink)" }}>{m}:{s}</span>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
        {["English", "اردو", "हिन्दी"].map(l => (
          <span key={l} style={{
            padding: "4px 10px", borderRadius: 999,
            border: "1px solid var(--line-2)", fontSize: 11, color: "var(--ink-mute)",
          }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

/* ---------------- DIRECT MESSAGE TAB ---------------- */
const DirectTab = () => {
  return (
    <div style={{ flex: 1, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: 999, margin: "8px auto 14px",
          background: "linear-gradient(135deg, #25d366, #128c7e)",
          display: "grid", placeItems: "center", color: "#fff",
          boxShadow: "0 14px 30px rgba(37,211,102,0.3)",
        }}>
          <Icon name="whatsapp" size={28} stroke={2} />
        </div>
        <h3 className="display" style={{ fontSize: 26, margin: "0 0 6px" }}>Message the host.</h3>
        <p style={{ fontSize: 13, color: "var(--ink-mute)", maxWidth: 300, margin: "0 auto" }}>
          Talk directly to Saira, our property manager. Average reply under a minute, 7am–11pm PKT.
        </p>
      </div>

      <div style={{
        padding: 16, borderRadius: 14,
        background: "var(--surface)", border: "1px solid var(--line)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 999,
          background: "linear-gradient(135deg, var(--brass), var(--pine))",
          display: "grid", placeItems: "center",
          color: "#1a1610", fontWeight: 700, fontSize: 14,
        }}>SR</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Saira Raza · Property manager</div>
          <div style={{ fontSize: 11, color: "var(--ink-dim)", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#7bd96f" }} />
            Online · last seen now
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          "I'd like to check availability",
          "Question about pet policy",
          "Group booking (4+ suites)",
          "Something else",
        ].map(t => (
          <button key={t} style={{
            padding: "12px 14px", borderRadius: 12,
            background: "transparent", border: "1px solid var(--line)",
            color: "var(--ink)", textAlign: "left", fontSize: 13,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            transition: "all 200ms",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--brass)"; e.currentTarget.style.background = "rgba(184,153,104,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "transparent"; }}
          >
            {t} <Icon name="arrow" size={14} />
          </button>
        ))}
      </div>

      <button style={{
        marginTop: "auto",
        padding: "14px 18px", borderRadius: 999, border: "none",
        background: "linear-gradient(135deg, #25d366, #128c7e)",
        color: "#fff", fontWeight: 600, fontSize: 14,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        boxShadow: "0 12px 30px rgba(37,211,102,0.3)",
      }}>
        <Icon name="whatsapp" size={16} stroke={2} /> Open chat · +92 51 ··· ····
      </button>
    </div>
  );
};

Object.assign(window, { AIHub });
