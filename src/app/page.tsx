"use client";

import Image from "next/image";
import { useState, useRef } from "react";

/* ━━━ Waveコンポーネント ━━━ */
function Wave({ color = "white", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 393 40"
      fill="none"
      className="w-full block"
      preserveAspectRatio="none"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0 0C20 28 50 38 80 30C110 22 130 8 160 12C190 16 210 32 240 36C270 40 300 28 330 18C355 10 375 20 393 14V40H0Z"
        fill={color}
      />
    </svg>
  );
}

/* ━━━ えらぶメシ データ ━━━ */
const foodItems = [
  { src: "/images/oke-21.jpg", caption: "マンゴージュースが出てくる\n居酒屋は多く\nノンアル界隈にはうれしい" },
  { src: "/images/oke-24.jpg", caption: "沖縄の文化も入ってるから\n沖縄そばも\nちゃんとうまい" },
  { src: "/images/oke-27.jpg", caption: "おきえらぶフローラルホテルの\n朝食ブッフェでは\n鶏飯（けいはん）が味わえる" },
  { src: "/images/oke-44.jpg", caption: "野生のみかんは\n種がでかくて\n酸っぱかった" },
  { src: "/images/oke-68.jpg", caption: "チキンがうまい\n豚肉もうまい\n牛もうまい" },
  { src: "/images/oke-69.jpg", caption: "試食でこの量\n新しい冷凍技術を\n魚のうまさで試すのだとか" },
  { src: "/images/oke-158.jpg", caption: "見たことないものが\n食べられるのがうれしい\nこれはいかのかまぼこ" },
  { src: "/images/oke-156.jpg", caption: "いもを餅にしたもの\n信じられないくらい\nうまかった" },
  { src: "/images/oke-166.jpg", caption: "シェフが気分でつくる\nごっついコロッケ\nじゃがの香りがすごい" },
  { src: "/images/oke-265.jpg", caption: "ナンコツ丼は\nコラーゲンたっぷりの\n豚丼だった（量がすごい）" },
];

/* ━━━ スポット写真 ━━━ */
const spotPhotos = [
  { src: "/images/oke-236.jpg", name: "フーチャ", w: 165, h: 262 },
  { src: "/images/oke-257.jpg", name: "越山展望所", w: 175, h: 262 },
  { src: "/images/oke-127.jpg", name: "ひみつのビーチ", w: 175, h: 262 },
  { src: "/images/oke-58.jpg", name: "田皆岬", w: 345, h: 262 },
  { src: "/images/oke-47.jpg", name: "アーニマガヤトゥール墓", w: 173, h: 262 },
];


export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  /* テキスト共通スタイル */
  const bodyText = { fontSize: 20, fontWeight: 300 as const, lineHeight: "2.3em", textAlign: "justify" as const };
  const headingText = { fontSize: 22, fontWeight: 500 as const, lineHeight: "2.09em" };
  const caveText = { fontFamily: "'Barlow Semi Condensed', 'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 400 as const, lineHeight: "1.79em", letterSpacing: "0.15em" };

  /* パスワード画面 */
  if (!isUnlocked) {
    return (
      <div className="max-w-[393px] mx-auto flex flex-col items-center justify-center relative overflow-hidden" style={{ fontFamily: "'Noto Sans JP', sans-serif", minHeight: "100dvh" }}>
        <div className="absolute inset-0">
          <Image src="/images/oke-236.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
        </div>
        <h1 className="text-white relative" style={{ fontFamily: "'Imbue', serif", fontSize: 80, fontWeight: 400, fontVariationSettings: "'opsz' 100", letterSpacing: "0.05em", zIndex: 1 }}>VTCL</h1>
        <p className="text-white relative" style={{ fontFamily: "'Imbue', serif", fontSize: 14, fontWeight: 400, fontVariationSettings: "'opsz' 100", marginTop: 4, opacity: 0.6, zIndex: 1 }}>VerticaL Magazine</p>
        <form
          className="relative"
          style={{ zIndex: 1 }}
          onSubmit={(e) => { e.preventDefault(); if (pw === "yamada") { setIsUnlocked(true); setPwError(false); } else { setPwError(true); } }}
          style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            placeholder="password"
            style={{ width: 200, padding: "10px 16px", fontSize: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 4, color: "#fff", textAlign: "center", outline: "none" }}
          />
          <button type="submit" style={{ width: 200, padding: "10px 16px", fontSize: 14, background: "#fff", color: "#000", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 500 }}>Enter</button>
          {pwError && <p style={{ color: "#ff6b6b", fontSize: 12, marginTop: -8 }}>パスワードが違います</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-[393px] mx-auto bg-white overflow-hidden" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>

      {/* ━━━ 1. COVER (393×852) ━━━ */}
      <section className="relative w-full overflow-hidden" style={{ height: 852 }}>
        <div className="absolute" style={{ left: -87, top: 0, width: 568, height: 852 }}>
          <Image src="/images/oke-236.jpg" alt="沖永良部島の海" fill className="object-cover" priority />
        </div>
        {/* VTCL — Imbue 271px, optical size 100 for thin strokes */}
        <h1 className="absolute text-white" style={{ fontFamily: "'Imbue', serif", fontSize: 271, fontWeight: 400, left: 28, top: 1, lineHeight: "1.2em", fontVariationSettings: "'opsz' 100" }}>VTCL</h1>
        <span className="absolute text-white" style={{ fontFamily: "'Imbue', serif", fontSize: 24, fontWeight: 400, left: 28, top: 37, fontVariationSettings: "'opsz' 100" }}>2026</span>
        <span className="absolute text-white" style={{ fontFamily: "'Imbue', serif", fontSize: 24, fontWeight: 400, left: 358, top: 37, fontVariationSettings: "'opsz' 100" }}>4</span>
        <span className="absolute text-white" style={{ fontFamily: "'Imbue', serif", fontSize: 24, fontWeight: 400, left: 29, top: 257, fontVariationSettings: "'opsz' 100" }}>No.1</span>
        <span className="absolute text-white" style={{ fontFamily: "'Imbue', serif", fontSize: 24, fontWeight: 400, left: 28, top: 257, width: 338, textAlign: "right", fontVariationSettings: "'opsz' 100" }}>VerticaL Magazine</span>
        {/* 沖永良部 — 49px, vertical, letter-spacing for wide character spacing */}
        <div className="absolute" style={{ left: 0, right: 0, top: 362, display: "flex", justifyContent: "center" }}>
          <span className="vertical-rl text-white" style={{ fontSize: 49, fontWeight: 500, letterSpacing: "0.66em" }}>沖永良部</span>
        </div>
        <span className="absolute text-white" style={{ fontFamily: "'Imbue', serif", fontSize: 17, fontWeight: 400, left: 130, top: 764, letterSpacing: "0.5em", fontVariationSettings: "'opsz' 100" }}>okinoerabu</span>
        {/* Wave at bottom of cover */}
        <div className="absolute bottom-0 left-0 right-0">
          <Wave />
        </div>
      </section>

      {/* ━━━ 3. ARTICLE 1 + HERO PHOTO ━━━ */}
      <section className="bg-white" style={{ padding: "48px 36px 0" }}>
        <h2 style={headingText}>4年ぶり3回目のえらぶ</h2>
        <div style={{ ...bodyText, marginTop: 62 }}>
          <p>2026年の3月。東京では開花宣言が出ているが、まだ肌寒い。えらぶゆりの島空港に降り立った時は小雨だったが、南国特有のむわっとした</p>
        </div>
      </section>
      {/* ヒーロー写真エリア（Figmaスクショ使用） */}
      <section className="relative w-full bg-white">
        <Image src="/images/section2.png" alt="ヒーロー写真" width={778} height={920} className="w-full h-auto" />
      </section>
      <section className="bg-white" style={{ padding: "0 36px 48px" }}>
        <div style={bodyText}>
          <p>目は2022年。そして、今回で3回目になる。いずれも、そこに友人であるネルソンがいたからなのだが、彼は6月には島を離れ、東京に来ることになった。だから、最後のチャンスだと思い、訪れたのだ。沖永良部FINAL。そう名付けた写真フォルダを共有したら、ネルソンに「そんな寂しいこと言うな」って怒られた。もしかしたら、またいつか、来ることになるかもしれない。知らんけど</p>
        </div>
      </section>

      {/* ━━━ 5. 基本情報 (Figmaスクショ画像を使用) ━━━ */}
      <section className="relative w-full">
        <Image src="/images/スクリーンショット 2026-03-25 22.42.54.png" alt="沖永良部島 基本情報" width={393} height={852} className="w-full h-auto" />
      </section>

      {/* ━━━ Wave: 基本情報 → えらぶメシ (light blue) ━━━ */}
      <div style={{ background: "#77DBF1" }}>
        <svg viewBox="0 0 393 40" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0 0C20 28 50 38 80 30C110 22 130 8 160 12C190 16 210 32 240 36C270 40 300 28 330 18C355 10 375 20 393 14V40H0Z" fill="white" />
        </svg>
      </div>

      {/* ━━━ 7. えらぶメシ (全て横スクロール) ━━━ */}
      <section className="bg-white">
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: 35, fontWeight: 500, letterSpacing: "0.61em" }}>えらぶメシ</h2>
        </div>
        <div className="gallery-scroll flex">
          {foodItems.map((food, i) => (
            <div key={i} className="flex-shrink-0 relative" style={{ width: 345, height: 517 }}>
              <Image src={food.src} alt={`えらぶメシ ${i + 1}`} fill className="object-cover" />
              {food.caption && (
                <p className="absolute text-white" style={{ fontFamily: "'Zen Kaku Gothic New'", fontSize: 16, fontWeight: 500, letterSpacing: "0.15em", lineHeight: "2em", whiteSpace: "pre-line", bottom: 16, left: 16 }}>
                  {food.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ 8. CAVING (写真をまたぐテキスト配置) ━━━ */}
      <section className="relative" style={{ height: 1797 }}>
        {/* P3233420 (0-524) */}
        <div className="absolute w-full" style={{ top: 0, height: 524 }}>
          <Image src="/images/P3233420.JPG" alt="ケイビング" fill className="object-cover" />
        </div>
        {/* Caving title */}
        <h2 className="absolute text-white" style={{ fontFamily: "'Amatica SC', cursive", fontSize: 111, fontWeight: 400, letterSpacing: "0.15em", lineHeight: "0.44em", left: 20, top: 37, zIndex: 2 }}>Caving</h2>
        {/* Text 1 — bridges P3233420 → IMG_1679 (top=463) */}
        <p className="absolute text-white" style={{ ...caveText, left: 20, right: 20, top: 463, zIndex: 2 }}>
          沖永良部には、300を超える鍾乳洞がある。サンゴ礁が隆起してできた島なので、岩や石に細かな穴が空いており、そこを流れる水が、長い年月をかけて、大きな空間をつくっていく。
        </p>
        {/* IMG_1679 (524-1048) */}
        <div className="absolute w-full" style={{ top: 524, height: 524 }}>
          <Image src="/images/IMG_1679.JPG" alt="鍾乳洞" fill className="object-cover" />
        </div>
        {/* Text 2 — bridges IMG_1679 → P3233431 (top=987) */}
        <p className="absolute text-white" style={{ ...caveText, left: 20, right: 20, top: 987, zIndex: 2 }}>
          ウェットスーツとツナギを着ていても、水は冷たく、体が冷える。ヘッドライトを消してみると、完全な暗闇に驚く。いつもは使わない身体中の筋肉を稼働させながら、岩の隙間に体を滑り込ませる。その先には、ここにしかない絶景が待っている。2回目なのに、初めてのように感じている。
        </p>
        {/* P3233431 (1048-1502) */}
        <div className="absolute w-full" style={{ top: 1048, height: 454 }}>
          <Image src="/images/P3233431.JPG" alt="鍾乳洞の奥" fill className="object-cover" />
        </div>
        {/* ウ character */}
        <p className="absolute text-white" style={{ ...caveText, left: 20, top: 1461, zIndex: 2 }}>ウ</p>
        {/* Text 3 — bridges P3233431 → P3233471 (top=1491) */}
        <p className="absolute text-white" style={{ ...caveText, left: 20, right: 20, top: 1491, zIndex: 2 }}>
          地上に出たら、入る前の自分とは別の人間になっているという感覚があった。これは、ある種の「胎内くぐり」なのかもしれない。
        </p>
        {/* P3233471 (1502-1797) */}
        <div className="absolute w-full" style={{ top: 1502, height: 295 }}>
          <Image src="/images/P3233471.JPG" alt="地上へ" fill className="object-cover" />
        </div>
      </section>

      {/* ━━━ 9. 西郷隆盛 COLUMN — oke-71背景にオーバーレイ ━━━ */}
      <section className="relative overflow-hidden" style={{ height: 656 }}>
        <div className="absolute" style={{ left: -22, top: 0, width: 437, height: 656 }}>
          <Image src="/images/oke-71.jpg" alt="沖永良部の風景" fill className="object-cover" />
        </div>
        <p className="absolute font-baoli text-white" style={{ fontSize: 26, fontWeight: 400, letterSpacing: "0.15em", lineHeight: "0.96em", left: 0, right: 0, top: 27, textAlign: "center" }}>column</p>
        <h3 className="absolute font-baoli text-white" style={{ fontSize: 45, fontWeight: 400, letterSpacing: "0.5em", lineHeight: "1.07em", textAlign: "center", left: 39, right: 39, top: 80 }}>
          西郷隆盛<br />
          <span style={{ fontSize: 36, letterSpacing: "0.15em" }}>と</span><br />
          沖永良部
        </h3>
        <div className="absolute flex" style={{ left: 39, right: 39, top: 239 }}>
          <div className="relative" style={{ width: "33.33%", height: 158 }}><Image src="/images/oke-78.jpg" alt="西郷1" fill className="object-cover" /></div>
          <div className="relative" style={{ width: "33.33%", height: 158 }}><Image src="/images/oke-80.jpg" alt="西郷2" fill className="object-cover" /></div>
          <div className="relative" style={{ width: "33.34%", height: 158 }}><Image src="/images/oke-87.jpg" alt="西郷3" fill className="object-cover" /></div>
        </div>
        <p className="absolute font-baoli text-white" style={{ fontSize: 20, fontWeight: 400, lineHeight: "1.45em", letterSpacing: "0.15em", left: 39, right: 39, top: 422 }}>
          西郷隆盛は島津久光の怒りに触れて沖永良部へと流罪となる.その際に飢饉を乗り切るための貯蔵庫の起案など島の発展に寄与した.この時期に大量の書物を読み,「敬天愛人」の思想に辿り着いたとされる.
        </p>
      </section>

      {/* ━━━ Wave: 西郷 → 名所めぐり ━━━ */}
      <Wave />

      {/* ━━━ 10. えらぶ名所めぐり ━━━ */}
      <section className="bg-white">
        <h2 style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: 26, fontWeight: 500, letterSpacing: "0.61em", textAlign: "center", padding: "4px 0 40px" }}>えらぶ名所めぐり</h2>
        <div className="relative w-full" style={{ height: 261 }}>
          <Image src="/images/スクリーンショット 2026-03-25 22.43.28.png" alt="沖永良部島マップ" fill className="object-cover" />
        </div>
        {/* ガジュマル + スポット写真 — 横スクロール（次の写真が少し見える） */}
        <div className="gallery-scroll flex" style={{ gap: 0 }}>
          <div className="flex-shrink-0 relative" style={{ width: 345, height: 262 }}>
            <Image src="/images/oke-220.jpg" alt="ガジュマル" fill className="object-cover" />
            <p className="absolute text-white" style={{ fontFamily: "'Zen Kaku Gothic New'", fontSize: 12, fontWeight: 500, letterSpacing: "0.41em", top: 9, left: 14 }}>国頭小学校のガジュマル</p>
          </div>
          {spotPhotos.map((spot, i) => (
            <div key={i} className="flex-shrink-0 relative" style={{ width: Math.min(spot.w, 345), height: spot.h }}>
              <Image src={spot.src} alt={spot.name} fill className="object-cover" />
              <p className="absolute bottom-2 left-2 text-white" style={{ fontFamily: "'Zen Kaku Gothic New'", fontSize: 12, fontWeight: 500, letterSpacing: "0.41em" }}>{spot.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ Wave: 名所 → フローラルホテル ━━━ */}
      <Wave />

      {/* ━━━ 11. ARTICLE 2: フローラルホテルのこと ━━━ */}
      <section className="bg-white" style={{ padding: "32px 36px 32px" }}>
        <h2 style={headingText}>フローラルホテルのこと</h2>
        <div style={{ ...bodyText, marginTop: 32 }}>
          <p>天皇陛下が宿泊されたという「おきえらぶフローラルホテル」は、島内で唯一の国営宿舎であり、いろいろな機能が詰まっている。宿泊客じゃなくても使える大浴場、レンタルバイク、ケイビングの会社の拠点、タウンホールなどなど。</p>
        </div>
        {/* 朝食写真 — 元の比率・左右余白つき */}
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Image src="/images/oke-162.jpg" alt="フローラルホテル" width={320} height={0} className="w-full h-auto" style={{ display: "block" }} />
        </div>
        <div style={bodyText}>
          <p>そんなホテルの名前は、来島するたびに聞いており、今回は念願の宿泊となった。空港からの送迎バスを出してくれたり、宿泊客のみが入れる展望風呂を案内してくれたりと、滞在を楽しむことができた。それに、名物の鶏飯（けいはん）が、朝食バイキングで食べられるのも、このホテルが長く愛されてきた秘訣のひとつであろう。</p>
        </div>
      </section>

      {/* ━━━ 12. 君はどのあざ？ ━━━ */}
      <section className="relative overflow-hidden">
        {/* 背景写真（明るく飛ばす） */}
        <div className="absolute inset-0">
          <Image src="/images/oke-11.jpg" alt="あざシール" fill className="object-cover" style={{ filter: "brightness(1.6) contrast(0.85)" }} />
          <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.45)" }} />
        </div>
        {/* コンテンツ */}
        <div className="relative" style={{ padding: "32px 26px 48px" }}>
          {/* タイトル（1行） + ・・ */}
          <div style={{ position: "relative" }}>
            <h2 className="font-baoli" style={{ fontSize: 55, fontWeight: 400, lineHeight: "1em", whiteSpace: "nowrap" }}>君はどのあざ？</h2>
            <span className="font-baoli" style={{ fontSize: 46, fontWeight: 400, letterSpacing: "0.2em", position: "absolute", left: "60%", top: -14, color: "#000" }}>・・</span>
          </div>
          <p style={{ fontSize: 20, fontWeight: 500, lineHeight: "1.5em", letterSpacing: "0.03em", marginTop: 16 }}>ネルソンの生業はライターであり、沖永良部にルーツをもつ奄美群島出身者でもある。そのルーツを活かして郷土を継承していく活動に取り組んでおり、そのひとつが、この「あざシール」である。あざとは「字」と書き、町内の単位のひとつ。出身県や出身学校に愛のある人はたくさんいると思うが、字に愛のある人もたくさんいる。その気持ちを表明できるのがあざシールなのだ。あなたにとっての字は何にあたるのだろうか。筆者にとっての字は、学生時代の人力飛行機サークルだろうなあ、などと思いました。</p>
        </div>
      </section>

      {/* ━━━ 映像タイトル帯 ━━━ */}
      <section style={{ background: "#000", padding: "48px 36px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontSize: 22, fontWeight: 500, color: "#fff", letterSpacing: "0.3em", lineHeight: "1.8em" }}>映像でふりかえる<br />沖永良部旅</h2>
      </section>

      {/* ━━━ 13. VIDEO SECTION (縦長・タップで再生) ━━━ */}
      <section className="relative" style={{ width: "100%", height: 700, overflow: "hidden" }}>
        <video
          ref={videoRef}
          src="/videos/oke3.mp4"
          muted loop playsInline
          poster=""
          onClick={() => { if (videoRef.current) { if (videoRef.current.paused) { videoRef.current.play(); } else { videoRef.current.pause(); } } }}
          style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", cursor: "pointer" }}
        />
        <button onClick={toggleMute} className="absolute bottom-4 right-4 bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm backdrop-blur-sm" style={{ zIndex: 2 }} aria-label={isMuted ? "音声をオンにする" : "音声をオフにする"}>
          {isMuted ? "\u{1F507}" : "\u{1F50A}"}
        </button>
      </section>

      {/* ━━━ 14. 山田グループ研究日誌 ━━━ */}
      <section className="bg-white">
        <h2 className="font-baoli" style={{ fontSize: 43, fontWeight: 400, lineHeight: "1.07em", textAlign: "center", padding: "76px 0 0" }}>山田グループ<br />研究日誌</h2>
        <div style={{ ...bodyText, padding: "48px 36px 40px" }}>
          <p>空港でおみやげものを冷やかしていると、見慣れない書籍が何冊か目に入った。山田明の「ほうらしゃ人生」とある。なんと3部作である。空港でここまで推されているとはどういう人物なんだろうか。</p>
        </div>
        <div className="relative w-full" style={{ height: 514 }}><Image src="/images/スクリーンショット 2026-03-25 22.43.54.png" alt="ほうらしゃ人生" fill className="object-cover" /></div>
        <div style={{ ...bodyText, padding: "32px 36px" }}>
          <p>調べてみてわかったのは、山田明は、山田海陸航空やホテルシーワールドなどを統括し、島の産業・観光に深く関わっている経営者であり、地元の名士である、ということ。空港も港も山田グループの運営だったのだ。この島の出入りは山田の手の中である。</p>
        </div>
        <div className="relative w-full" style={{ height: 589 }}><Image src="/images/oke-261.jpg" alt="施設" fill className="object-cover" /></div>
        <div style={{ ...bodyText, padding: "32px 36px" }}>
          <p>街を歩いていると、「山田明記念美術博物館」を発見する。この島の発展に寄与してきた人物ともなれば、美術博物館のひとつもできるのであろう。残念ながら中には入らなかったが、セスナの模型などが見えた。</p>
        </div>
        <div className="relative w-full" style={{ height: 335 }}><Image src="/images/oke-145.jpg" alt="施設" fill className="object-cover" /></div>
        <div style={{ ...bodyText, padding: "32px 36px" }}>
          <p>港を歩いていると、山田グループの周年を記念したレリーフのようなものがあり、そこには、全山田グループの社名が列挙されていた。まるで、日立の「この木なんの木」のようにたくさんの企業群が明記されている。陸海空のみならず、観光、カフェ、教育にまで進出しており、最近は家系ラーメンまで事業を拡大している。山田グループの躍進は目覚ましいものがある。</p>
        </div>
        <div className="relative w-full" style={{ height: 485 }}><Image src="/images/oke-136.jpg" alt="記念碑" fill className="object-cover" /></div>
        <div style={{ ...bodyText, padding: "32px 36px" }}>
          <p>そして、ついに、山田グループはこの島の神になった。慈悲の心が、観音を建設させたのである。これを建てることを決めた会議に出席したい。だれが発案し、どのような稟議が決済され、ハンコが押されるのであろうか。</p>
        </div>
        <div className="relative w-full" style={{ height: 599 }}><Image src="/images/oke-138.jpg" alt="観音像" fill className="object-cover" /></div>
        <div style={{ ...bodyText, padding: "32px 36px" }}>
          <p>そして、もはやこれくらいじゃ驚かない、存命の人物の銅像である。旧ソ連圏を旅した時によく見たなあ。学生運動や組合活動に熱心だった人が島に集まるという話を聞き、何かを過剰に接続したくなったのであった。やっぱりまた来るかもしれない</p>
        </div>
      </section>

      {/* ━━━ 15. 編集後記 (水色背景 + 上部に波線) ━━━ */}
      <section style={{ background: "#77DBF1", padding: "0 0 56px" }}>
        <svg viewBox="0 0 393 40" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0 40C20 12 50 2 80 10C110 18 130 32 160 28C190 24 210 8 240 4C270 0 300 12 330 22C355 30 375 20 393 26V0H0Z" fill="white" />
        </svg>
        <div style={{ padding: "48px 36px 0" }}>
        <h2 className="font-baoli" style={{ fontSize: 20, fontWeight: 400, lineHeight: "2.3em" }}>編集後記</h2>
        <p style={{ fontFamily: "'Balthazar', 'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "2.57em", marginTop: 16 }}>
          縦型スクロールの形式で、画像も映像もテキストも楽しめればいいのに。という思いつきでつくってみたら、なんだか楽しかったので、またやるかもしれない。旅の時とか、登山の時とか。本編は、いわゆるガイドブック的なものと情報がかぶるので、コラムの方が楽しいのもまた発見であった。またいつか、どこかでお会いしましょう。
        </p>
        <p className="font-baoli" style={{ fontSize: 20, fontWeight: 400, lineHeight: "2.3em", textAlign: "right", marginTop: 32 }}>Paul.</p>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{ background: "#77DBF1", textAlign: "center", padding: "32px 28px" }}>
        <p style={{ fontSize: 10, color: "rgba(0,0,0,0.4)" }}>&copy; 2026 VTCL. All rights reserved.</p>
      </footer>
    </div>
  );
}
