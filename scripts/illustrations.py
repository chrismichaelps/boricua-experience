# Generates the glossy story illustrations in public/assets/illustrations from shared gradient and
# gloss primitives. Usage: python3 -I scripts/illustrations.py public/assets/illustrations
import os, sys
out = sys.argv[1]
RM = "@media (prefers-reduced-motion:reduce){*{animation:none!important}}"
def svg(name, title, defs, body, style):
    doc = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><title>{title}</title><style>{style}{RM}</style><defs>{defs}</defs>{body}</svg>'
    open(os.path.join(out, name + ".svg"), "w").write(doc)
def gloss(cx, cy, rx, ry, rot=-25, op=.55):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#fff" opacity="{op}" transform="rotate({rot} {cx} {cy})"/>'
shadow = '<ellipse cx="60" cy="108" rx="30" ry="5" fill="#2b2b2b" opacity=".12"/>'
def rg(id, stops, cx=".35", cy=".3", r=".85"):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<radialGradient id="{id}" cx="{cx}" cy="{cy}" r="{r}">{s}</radialGradient>'
def lg(id, stops, x2="0", y2="1"):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{id}" x1="0" y1="0" x2="{x2}" y2="{y2}">{s}</linearGradient>'
GREEN = [("0", "#9be070"), (".55", "#4fae43"), ("1", "#2d7a33")]

# 1 Cotorra with heart eyes
svg("cotorra-love", "Cotorra enamorada",
    rg("h", GREEN) + rg("t", [("0", "#ff7a62"), ("1", "#d23a2a")]) + lg("b", [("0", "#fff6dc"), ("1", "#dcbb7e")]) + rg("e", [("0", "#ff7a8a"), ("1", "#e0233f")]),
    shadow + '<g class="bob"><path d="M60 16c26 0 44 20 44 46 0 24-18 42-44 42S16 86 16 62c0-26 18-46 44-46z" fill="url(#h)"/>'
    + '<path d="M34 30c8-12 44-12 52 0-6 6-14 8-26 8s-20-2-26-8z" fill="url(#t)"/>' + gloss(40, 42, 12, 6)
    + '<ellipse cx="30" cy="74" rx="7" ry="4.5" fill="#ff8fa3" opacity=".75"/><ellipse cx="90" cy="74" rx="7" ry="4.5" fill="#ff8fa3" opacity=".75"/>'
    + '<circle cx="40" cy="56" r="13" fill="#fff"/><circle cx="80" cy="56" r="13" fill="#fff"/>'
    + '<g class="heart l"><path d="M40 65c-6-4-10-8-10-12 0-3.5 2.5-6 5-6 2.5 0 4 1.6 5 3.4 1-1.8 2.5-3.4 5-3.4 2.5 0 5 2.5 5 6 0 4-4 8-10 12z" fill="url(#e)"/></g>'
    + '<g class="heart r"><path d="M80 65c-6-4-10-8-10-12 0-3.5 2.5-6 5-6 2.5 0 4 1.6 5 3.4 1-1.8 2.5-3.4 5-3.4 2.5 0 5 2.5 5 6 0 4-4 8-10 12z" fill="url(#e)"/></g>'
    + '<path d="M48 70c4-6 20-6 24 0 3 5 0 16-12 22-12-6-15-17-12-22z" fill="url(#b)" stroke="#c49a55" stroke-width="1.5"/><path d="M50 76c5 2 15 2 20 0" stroke="#c49a55" stroke-width="2" fill="none" stroke-linecap="round"/></g>',
    ".bob{animation:bob 3.2s ease-in-out infinite}.heart{transform-box:fill-box;transform-origin:center;animation:beat 1.4s ease-in-out infinite}.r{animation-delay:.12s}@keyframes bob{50%{transform:translateY(-3px)}}@keyframes beat{0%,100%{transform:scale(1)}15%{transform:scale(1.2)}30%{transform:scale(.95)}}")

# 2 Light bulb
svg("bulb", "Bombilla",
    rg("g", [("0", "#fff8b0"), (".5", "#ffd84a"), ("1", "#f0a500")]) + lg("m", [("0", "#e3e6ea"), ("1", "#9aa3ad")]),
    shadow + '<g class="rays" stroke="#ffc928" stroke-width="5" stroke-linecap="round"><path d="M60 6v9M24 20l6 6M96 20l-6 6M10 52h9M110 52h-9"/></g>'
    + '<path d="M60 18c-19 0-33 14-33 32 0 12 7 20 13 26 3 3 4 6 4 10h32c0-4 1-7 4-10 6-6 13-14 13-26 0-18-14-32-33-32z" fill="url(#g)"/>'
    + gloss(48, 36, 10, 6) + '<path d="M52 66c0-8 4-12 8-12s8 4 8 12" stroke="#e79a00" stroke-width="3" fill="none" stroke-linecap="round"/>'
    + '<rect x="43" y="86" width="34" height="8" rx="4" fill="url(#m)"/><rect x="45" y="94" width="30" height="7" rx="3.5" fill="url(#m)"/><path d="M52 101h16l-3 6h-10z" fill="#7c858f"/>',
    ".rays{transform-origin:60px 52px;animation:glow 2.4s ease-in-out infinite}@keyframes glow{0%,100%{opacity:.35;transform:scale(.94)}50%{opacity:1;transform:scale(1.04)}}")

# 3 Green seal with check
pts = []
import math
for i in range(24):
    r = 44 if i % 2 == 0 else 38
    a = math.pi * 2 * i / 24
    pts.append(f"{60 + r*math.cos(a):.1f},{58 + r*math.sin(a):.1f}")
svg("seal", "Sello gratis",
    rg("s", [("0", "#94e872"), (".6", "#46b546"), ("1", "#2a8a35")]),
    shadow + f'<g class="spin"><polygon points="{" ".join(pts)}" fill="url(#s)" stroke="#2a8a35" stroke-width="1.5" stroke-linejoin="round"/></g>'
    + gloss(46, 38, 12, 7) + '<path class="tick" d="M42 59l12 12 24-26" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    ".spin{transform-origin:60px 58px;animation:spin 18s linear infinite}.tick{transform-origin:60px 58px;animation:pulse 2.4s ease-in-out infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}")

# 4 Puerto Rico flag
svg("flag-pr", "Bandera de Puerto Rico",
    lg("p", [("0", "#d9dde2"), ("1", "#8d96a0")], x2="1", y2="0") + '<clipPath id="c"><path d="M30 24c14-6 26 6 40 0s20-4 30 0v46c-10-4-16-6-30 0s-26-6-40 0z"/></clipPath>',
    shadow + '<rect x="25" y="18" width="6" height="90" rx="3" fill="url(#p)"/><circle cx="28" cy="17" r="5" fill="#f5c542"/>'
    + '<g class="wave"><g clip-path="url(#c)"><rect x="30" y="16" width="72" height="60" fill="#fff"/>'
    + "".join(f'<rect x="30" y="{16+i*12}" width="72" height="9.6" fill="#e5413a"/>' for i in range(5) if i % 2 == 0)
    + '<path d="M30 16l40 30-40 30z" fill="#3a8be0"/><path d="M42 39l2.4 5 5.4.6-4 3.7 1.1 5.3-4.9-2.7-4.8 2.7 1-5.3-4-3.7 5.4-.6z" fill="#fff"/></g>'
    + '<path d="M30 24c14-6 26 6 40 0s20-4 30 0" stroke="#fff" stroke-width="3" opacity=".45" fill="none"/></g>',
    ".wave{transform-origin:30px 46px;animation:wave 2.6s ease-in-out infinite}@keyframes wave{0%,100%{transform:skewY(0) scaleX(1)}50%{transform:skewY(-3deg) scaleX(.97)}}")

# 5 Heart with sparkles
star = lambda x, y, s, cls: f'<path class="{cls}" d="M{x} {y-s}c{s*.15} {s*.65} {s*.35} {s*.85} {s} {s}c-{s*.65} {s*.15}-{s*.85} {s*.35}-{s} {s}c-{s*.15}-{s*.65}-{s*.35}-{s*.85}-{s}-{s}c{s*.65}-{s*.15} {s*.85}-{s*.35} {s}-{s}z" fill="#ffcf33"/>'
svg("heart", "Corazón",
    rg("h", [("0", "#ff8fa0"), (".55", "#f0475f"), ("1", "#c4213a")]),
    shadow + '<g class="beat"><path d="M60 100C30 80 14 64 14 44c0-14 10-24 23-24 10 0 18 6 23 14 5-8 13-14 23-14 13 0 23 10 23 24 0 20-16 36-46 56z" fill="url(#h)"/>' + gloss(36, 38, 11, 7) + '</g>'
    + star(96, 26, 11, "tw a") + star(22, 84, 8, "tw b"),
    ".beat{transform-origin:60px 60px;animation:beat 1.6s ease-in-out infinite}.tw{transform-box:fill-box;transform-origin:center;animation:tw 1.8s ease-in-out infinite}.b{animation-delay:.9s}@keyframes beat{0%,100%{transform:scale(1)}14%{transform:scale(1.08)}28%{transform:scale(.97)}}@keyframes tw{0%,100%{transform:scale(.6) rotate(0);opacity:.6}50%{transform:scale(1.1) rotate(20deg);opacity:1}}")

# 6 Thumbs up
svg("thumbs-up", "Pulgar arriba",
    rg("k", [("0", "#ffd9a8"), (".6", "#f2a95e"), ("1", "#c97a33")]) + lg("cuff", [("0", "#5aa0f2"), ("1", "#1f6fd0")]),
    shadow + '<g class="nod"><rect x="14" y="58" width="22" height="44" rx="6" fill="url(#cuff)"/>'
    + '<path d="M36 60c10-4 16-14 18-26 1-7 4-12 10-12 7 0 10 7 9 15l-3 13h20c7 0 12 6 10 13l-6 26c-2 7-7 11-14 11H36z" fill="url(#k)"/>'
    + '<path d="M70 62h24M68 75h24M68 88h20" stroke="#c97a33" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>' + gloss(58, 34, 6, 4) + gloss(80, 58, 9, 4, 0, .4) + '</g>',
    ".nod{transform-origin:40px 100px;animation:nod 2.4s ease-in-out infinite}@keyframes nod{0%,60%,100%{transform:rotate(0)}70%{transform:rotate(-8deg)}80%{transform:rotate(4deg)}90%{transform:rotate(-3deg)}}")

# 7 Shield with lock
svg("shield", "Escudo",
    lg("s", [("0", "#7fb8ff"), (".55", "#2f7ff0"), ("1", "#1a56b8")]) + lg("l", [("0", "#fff"), ("1", "#dfe8f5")]),
    shadow + '<path d="M60 10l38 14v28c0 26-16 44-38 54C38 96 22 78 22 52V24z" fill="url(#s)"/><path d="M60 10l38 14v28c0 26-16 44-38 54z" fill="#000" opacity=".08"/>'
    + gloss(42, 30, 12, 6) + '<path d="M48 56v-8c0-7 5-12 12-12s12 5 12 12v8" stroke="#fff" stroke-width="6" fill="none"/><rect x="42" y="54" width="36" height="28" rx="7" fill="url(#l)"/><circle cx="60" cy="65" r="4" fill="#1a56b8"/><rect x="58" y="66" width="4" height="9" rx="2" fill="#1a56b8"/>'
    + '<rect class="shine" x="-40" y="0" width="16" height="120" fill="#fff" opacity=".22" transform="skewX(-20)"/>',
    ".shine{animation:shine 3.6s ease-in-out infinite}@keyframes shine{0%,55%{transform:skewX(-20deg) translateX(0)}100%{transform:skewX(-20deg) translateX(190px)}}")

# 8 Coqui
svg("coqui", "Coquí",
    rg("c", [("0", "#e6c690"), (".6", "#b98a4e"), ("1", "#8a6232")]) + rg("w", [("0", "#fff"), ("1", "#e8ecef")]),
    shadow + '<g class="hop"><ellipse cx="60" cy="72" rx="40" ry="30" fill="url(#c)"/><circle cx="38" cy="42" r="16" fill="url(#c)"/><circle cx="82" cy="42" r="16" fill="url(#c)"/>'
    + '<circle cx="38" cy="41" r="11" fill="url(#w)"/><circle cx="82" cy="41" r="11" fill="url(#w)"/><g class="eyes"><circle cx="40" cy="42" r="6" fill="#2b2118"/><circle cx="84" cy="42" r="6" fill="#2b2118"/><circle cx="42" cy="40" r="2" fill="#fff"/><circle cx="86" cy="40" r="2" fill="#fff"/></g>'
    + gloss(46, 62, 12, 5, -10, .35) + '<path d="M44 74c8 8 24 8 32 0" stroke="#5e3f1c" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
    + '<ellipse class="sac" cx="60" cy="88" rx="10" ry="6" fill="#f3d9a6"/><ellipse cx="30" cy="76" rx="6" ry="4" fill="#ff9aa8" opacity=".6"/><ellipse cx="90" cy="76" rx="6" ry="4" fill="#ff9aa8" opacity=".6"/></g>',
    ".hop{animation:hop 2.8s ease-in-out infinite}.eyes{transform-origin:60px 42px;animation:blink 4s infinite}.sac{transform-box:fill-box;transform-origin:center;animation:sing 2.8s ease-in-out infinite}@keyframes hop{0%,70%,100%{transform:translateY(0)}80%{transform:translateY(-8px)}}@keyframes blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}@keyframes sing{0%,60%,100%{transform:scale(1)}70%{transform:scale(1.6,1.4)}}")

# 9 Magnifier over map pin
svg("search", "Lupa",
    rg("g", [("0", "#e9f6ff"), (".7", "#bfe3ff"), ("1", "#8ccbff")]) + lg("h", [("0", "#ff9a5c"), ("1", "#e2552b")]) + rg("p", [("0", "#ff8a7a"), ("1", "#e23a2c")]),
    shadow + '<g class="scan"><rect x="70" y="72" width="14" height="38" rx="7" fill="url(#h)" transform="rotate(-45 77 91)"/><circle cx="50" cy="50" r="34" fill="#fff"/><circle cx="50" cy="50" r="30" fill="url(#g)"/>'
    + '<path d="M50 30c-9 0-15 7-15 15 0 11 15 24 15 24s15-13 15-24c0-8-6-15-15-15z" fill="url(#p)"/><circle cx="50" cy="45" r="6" fill="#fff"/>'
    + '<circle cx="50" cy="50" r="34" fill="none" stroke="#5f6b78" stroke-width="7"/>' + gloss(36, 32, 9, 5) + '</g>',
    ".scan{transform-origin:60px 60px;animation:scan 4s ease-in-out infinite}@keyframes scan{0%,100%{transform:translate(0,0) rotate(0)}25%{transform:translate(4px,-3px) rotate(4deg)}50%{transform:translate(-3px,2px) rotate(-3deg)}75%{transform:translate(2px,3px) rotate(2deg)}}")

# 10 Ticket
svg("ticket", "Boleto",
    lg("t", [("0", "#ffb35c"), ("1", "#f07a1f")], x2="1", y2="1"),
    shadow + '<g class="tilt"><path d="M14 36h92v14a10 10 0 0 0 0 20v14H14V70a10 10 0 0 0 0-20z" fill="url(#t)"/>'
    + '<path d="M78 38v44" stroke="#fff" stroke-width="3" stroke-dasharray="5 5" opacity=".75"/>' + gloss(34, 44, 12, 4, -5, .45)
    + '<path d="M46 47l3.5 7.4 8 .9-6 5.5 1.7 7.9-7.2-4-7.2 4 1.7-7.9-6-5.5 8-.9z" fill="#fff"/><text x="92" y="65" font-family="Nunito Sans,Arial" font-size="12" font-weight="900" fill="#fff" text-anchor="middle" transform="rotate(90 92 61)">RSVP</text></g>',
    ".tilt{transform-origin:60px 60px;animation:tilt 3s ease-in-out infinite}@keyframes tilt{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg) translateY(-3px)}}")

# 11 Party popper
conf = [("#ff5a6e", 74, 20), ("#4fb0ff", 92, 34), ("#ffd23f", 86, 14), ("#59c96b", 100, 22), ("#b56cff", 68, 8), ("#ff9a3c", 104, 46)]
svg("party", "Celebración",
    lg("c", [("0", "#ffe28a"), ("1", "#f2a900")], x2="1", y2="1"),
    shadow + '<path d="M16 104l26-70 44 44z" fill="url(#c)"/><path d="M24 82l40 16M31 62l40 18M38 44l32 14" stroke="#e24a4a" stroke-width="5" opacity=".75"/>' + gloss(36, 60, 5, 12, 20, .4)
    + "".join(f'<rect class="cf c{i}" x="{x}" y="{y}" width="7" height="10" rx="2" fill="{c}"/>' for i, (c, x, y) in enumerate(conf))
    + '<path class="cf c6" d="M60 30c4-8 12-8 14-16" stroke="#4fb0ff" stroke-width="4" fill="none" stroke-linecap="round"/>',
    ".cf{transform-box:fill-box;transform-origin:center;animation:pop 2.2s ease-out infinite}" + "".join(f".c{i}{{animation-delay:{i*.12:.2f}s}}" for i in range(7)) + "@keyframes pop{0%{transform:translate(-14px,14px) scale(.2) rotate(0);opacity:0}25%{opacity:1}70%{transform:translate(0,0) scale(1) rotate(160deg);opacity:1}100%{transform:translate(4px,6px) scale(1) rotate(220deg);opacity:0}}")

# 12 Rocket
svg("rocket", "Cohete",
    lg("r", [("0", "#ffffff"), ("1", "#cfd8e3")], x2="1", y2="0") + lg("f", [("0", "#ffe066"), ("1", "#ff6a2b")]),
    shadow + '<g class="fly"><path class="flame" d="M52 86c0 12 8 20 8 20s8-8 8-20z" fill="url(#f)"/><path d="M60 10c16 12 22 32 18 76H42c-4-44 2-64 18-76z" fill="url(#r)"/>'
    + '<path d="M42 60l-14 18 2 12 12-6zM78 60l14 18-2 12-12-6z" fill="#e5413a"/><path d="M60 10c8 6 12 12 15 20H45c3-8 7-14 15-20z" fill="#e5413a"/>'
    + '<circle cx="60" cy="50" r="9" fill="#3a8be0" stroke="#fff" stroke-width="3"/>' + gloss(52, 40, 3, 14, 0, .5) + '</g>',
    ".fly{animation:fly 2.2s ease-in-out infinite}.flame{transform-origin:60px 86px;animation:flick .25s ease-in-out infinite alternate}@keyframes fly{50%{transform:translateY(-5px)}}@keyframes flick{to{transform:scaleY(1.25)}}")

# 13 Key
svg("key", "Llave",
    lg("k", [("0", "#ffe58a"), (".5", "#f6c02c"), ("1", "#c98d0a")], x2="1", y2="1"),
    shadow + '<g class="turn"><circle cx="40" cy="44" r="24" fill="url(#k)"/><circle cx="40" cy="44" r="9" fill="#fff"/><path d="M56 58l38 38-8 8-6-6-6 6-6-6 4-4-24-24z" fill="url(#k)"/>' + gloss(30, 34, 8, 5) + '</g>',
    ".turn{transform-origin:40px 44px;animation:turn 3.4s ease-in-out infinite}@keyframes turn{0%,60%,100%{transform:rotate(0)}75%{transform:rotate(-14deg)}88%{transform:rotate(6deg)}}")

# 14 Star
svg("star", "Estrella",
    rg("s", [("0", "#fff3a0"), (".5", "#ffd23f"), ("1", "#f29e00")]),
    shadow + '<g class="spin"><path d="M60 10l14 30 32 4-24 22 6 32-28-16-28 16 6-32-24-22 32-4z" fill="url(#s)" stroke="#f29e00" stroke-width="2" stroke-linejoin="round"/>' + gloss(48, 34, 9, 5) + '</g>'
    + star(100, 18, 8, "tw") + star(18, 30, 6, "tw b"),
    ".spin{transform-origin:60px 58px;animation:sp 4s ease-in-out infinite}.tw{transform-box:fill-box;transform-origin:center;animation:tw 1.8s ease-in-out infinite}.b{animation-delay:.9s}@keyframes sp{0%,100%{transform:rotate(-6deg) scale(1)}50%{transform:rotate(6deg) scale(1.05)}}@keyframes tw{0%,100%{transform:scale(.5);opacity:.5}50%{transform:scale(1.15);opacity:1}}")

# 15 Envelope
svg("envelope", "Sobre",
    lg("e", [("0", "#ffffff"), ("1", "#e4ebf3")]) + lg("f", [("0", "#5aa0f2"), ("1", "#1f6fd0")]),
    shadow + '<g class="float"><rect x="16" y="34" width="88" height="62" rx="10" fill="url(#e)" stroke="#c9d4e0" stroke-width="2"/><path d="M18 40l42 32 42-32" fill="none" stroke="#1f6fd0" stroke-width="5" stroke-linejoin="round"/>'
    + '<circle cx="96" cy="36" r="13" fill="#e5413a"/><text x="96" y="41" font-family="Nunito Sans,Arial" font-size="15" font-weight="900" fill="#fff" text-anchor="middle">1</text>' + gloss(36, 46, 12, 4, -5, .6) + '</g>',
    ".float{animation:fl 3s ease-in-out infinite}@keyframes fl{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-5px) rotate(3deg)}}")

# Hero mascot: the cotorra waving from a flamboyan branch
def flower(x, y, r, cls):
    petals = "".join(f'<ellipse cx="{x}" cy="{y-r}" rx="{r*.55}" ry="{r*.8}" fill="url(#fl)" transform="rotate({a} {x} {y})"/>' for a in range(0, 360, 72))
    return f'<g class="{cls}">{petals}<circle cx="{x}" cy="{y}" r="{r*.35}" fill="#ffd24a"/></g>'
doc = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><title>Cotorra saludando</title><style>'
  '.body{animation:bob 3.6s ease-in-out infinite}.wing{transform-origin:226px 236px;animation:wave 1.6s ease-in-out infinite}'
  '.lid{transform-origin:236px 132px;transform:scaleY(0);animation:blink 4.5s 1s infinite}.head{transform-origin:220px 190px;animation:tilt 7s ease-in-out infinite}'
  '.f1,.f2,.f3{transform-box:fill-box;transform-origin:center;animation:sway 4s ease-in-out infinite}.f2{animation-delay:-1.3s}.f3{animation-delay:-2.6s}'
  '.tw{transform-box:fill-box;transform-origin:center;animation:tw 2s ease-in-out infinite}.tw2{animation-delay:1s}'
  '@keyframes bob{50%{transform:translateY(-6px)}}@keyframes wave{0%,100%{transform:rotate(0)}25%{transform:rotate(-22deg)}50%{transform:rotate(-6deg)}75%{transform:rotate(-24deg)}}'
  '@keyframes blink{0%,94%,100%{transform:scaleY(0)}97%{transform:scaleY(1)}}@keyframes tilt{0%,40%,100%{transform:rotate(0)}50%,60%{transform:rotate(-6deg)}70%{transform:rotate(3deg)}}'
  '@keyframes sway{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}@keyframes tw{0%,100%{transform:scale(.5);opacity:.4}50%{transform:scale(1.15);opacity:1}}'
  + RM + '</style><defs>'
  + rg("g", [("0", "#a4e47a"), (".55", "#55b047"), ("1", "#2c7a34")], cx=".4", cy=".25", r=".9")
  + rg("belly", [("0", "#c8f0a0"), ("1", "#7cc75e")], cx=".5", cy=".4", r=".7")
  + lg("w", [("0", "#3f9a45"), ("1", "#1f6a2c")])
  + lg("tail", [("0", "#2f8f8a"), ("1", "#1b5d7a")])
  + rg("red", [("0", "#ff7a62"), ("1", "#cf3626")])
  + lg("beak", [("0", "#fff6dc"), ("1", "#d9b676")])
  + lg("br", [("0", "#9a6b3f"), ("1", "#5f3d1f")])
  + rg("fl", [("0", "#ff8a4a"), ("1", "#e2341f")], cx=".5", cy=".8", r=".9")
  + '</defs>'
  '<ellipse cx="200" cy="372" rx="120" ry="12" fill="#2b2b2b" opacity=".1"/>'
  '<g class="body">'
  '<path d="M186 296c-14 30-26 56-44 78 26-4 46-22 58-48z" fill="url(#tail)"/><path d="M200 300c-4 32-6 56-18 80 22-10 34-34 36-62z" fill="url(#tail)"/>'
  '<path d="M150 210c0-62 32-104 74-104s70 40 66 100c-4 58-34 100-74 100-44 0-66-40-66-96z" fill="url(#g)"/>'
  '<path d="M178 236c0-34 18-54 42-54s38 22 36 56c-2 34-18 56-40 56-24 0-38-22-38-58z" fill="url(#belly)" opacity=".85"/>'
  '<path d="M160 190c-20 18-26 60-8 90 10 16 26 22 40 22-24-30-28-70-12-104z" fill="url(#w)"/>'
  '<g class="wing"><path d="M226 236c26-12 52-44 66-84 6 34-6 74-34 98-12 10-26 8-32-14z" fill="url(#w)"/><path d="M262 178c8-8 14-18 18-28M252 196c10-6 18-16 24-26" stroke="#7cc75e" stroke-width="4" stroke-linecap="round" fill="none" opacity=".6"/></g>'
  '<g class="head"><path d="M192 112c10-22 56-26 74-2-16 4-30 6-44 6s-22-2-30-4z" fill="url(#red)"/>'
  '<ellipse cx="190" cy="104" rx="60" ry="36" fill="#fff" opacity=".18" transform="rotate(-20 190 104)"/>'
  '<circle cx="236" cy="132" r="22" fill="#fff"/><circle cx="240" cy="134" r="12" fill="#22302a"/><circle cx="245" cy="128" r="4.5" fill="#fff"/><circle cx="235" cy="140" r="2" fill="#fff"/>'
  '<ellipse class="lid" cx="236" cy="132" rx="23" ry="23" fill="#55b047"/>'
  '<ellipse cx="216" cy="168" rx="13" ry="8" fill="#ff8fa3" opacity=".7"/>'
  '<path d="M264 138c22-4 40 10 38 30-2 14-14 22-26 22 6-10 8-18 2-24l-14-6z" fill="url(#beak)" stroke="#c49a55" stroke-width="2"/><path d="M276 166c8 0 14 6 12 14" stroke="#c49a55" stroke-width="3" fill="none" stroke-linecap="round"/></g>'
  '<path d="M196 296c-4 10-4 18 0 24M226 296c0 10 2 18 6 24" stroke="#d99a8a" stroke-width="9" stroke-linecap="round"/>'
  '</g>'
  '<path d="M40 324c70-14 160-8 330 10l2 14c-120-12-230-16-332-6z" fill="url(#br)"/><path d="M120 322c-10-18-6-34 6-44M300 330c12-14 30-18 46-14" stroke="#6e4826" stroke-width="7" stroke-linecap="round" fill="none"/>'
  '<path d="M90 316c-18-8-26-24-22-38 14 4 24 20 22 38z" fill="#4fae43"/><path d="M330 330c8-18 26-26 40-22-6 14-24 24-40 22z" fill="#4fae43"/>'
  + flower(70, 300, 14, "f1") + flower(126, 274, 11, "f2") + flower(346, 312, 15, "f3") + flower(310, 296, 10, "f1")
  + '<path class="tw" d="M96 120c3 12 6 15 18 18-12 3-15 6-18 18-3-12-6-15-18-18 12-3 15-6 18-18z" fill="#ffcf33"/>'
  '<path class="tw tw2" d="M330 70c2 8 4 10 12 12-8 2-10 4-12 12-2-8-4-10-12-12 8-2 10-4 12-12z" fill="#4fb0ff"/>'
  '<path class="tw" d="M352 200c2 7 3 8 10 10-7 2-8 3-10 10-2-7-3-8-10-10 7-2 8-3 10-10z" fill="#ff7a8a"/>'
  '</svg>')
open(os.path.join(out, "cotorra-hero.svg"), "w").write(doc)
print("ok")
