import MusicPlayer from "./musicPlayer";

// Standalone section, previously a rotating panel nested inside grid.tsx.
// Promoted to its own section on the portfolio page, same level as
// photoTransition.tsx or Grid itself.
function MusicSection() {
  return (
    <section className="w-full xl:px-24 px-6 py-16 xl:py-24 flex flex-col items-center gap-10">
      <div className="flex items-center gap-3">
        <div className="w-4 h-px bg-black/20" />
        <span className="font-anonymous uppercase text-[7px] tracking-[0.35em] text-black/30">
          Now playing
        </span>
      </div>
      <MusicPlayer />
    </section>
  );
}

export default MusicSection;
