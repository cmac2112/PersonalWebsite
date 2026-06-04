import football from "../../../assets/pfp - Copy.jpg"

const AboutMeIntro = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-4" style={{ fontSize: '1rem' }}>
      <img
        className="w-44 h-44 rounded-full object-cover ring-4 ring-yellow-400/40 shadow-2xl"
        src={football}
        alt="Caden McArthur"
      />
      <div className="max-w-2xl space-y-4 text-center">
        <p className="text-slate-300 leading-relaxed">
          Hi, I'm a 23-year-old Software Engineer with a Bachelor's degree in Software Development
          and a minor in Mathematics from{" "}
          <a
            className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 transition-colors"
            href="./Experience/bethelcollege"
          >
            Bethel College
          </a>. I'm passionate about building clean, efficient software and tackling complex
          problems that push me to grow as a developer.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Whether I'm architecting a new feature or debugging a tricky edge case, I bring curiosity
          and dedication to everything I write. I'm always looking to expand my skill set and
          contribute to meaningful projects.
        </p>
      </div>
    </div>
  )
}

export default AboutMeIntro
