const Hero = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center py-10 text-center">
        <h1 className="text-4xl font-bold uppercase dark:text-white md:text-5xl lg:text-6xl">
          From my <span className="text-pink-400">brain</span> to yours.
        </h1>
        <p className="mt-4 text-2xl text-gray-600 md:text-3xl lg:text-4xl">
          Started from GeoCities, now we&apos;re here.
        </p>
      </div>
    </div>
  )
}

export default Hero
