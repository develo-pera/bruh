export default function Home() {
  return (
    <main className="max-w-[1000px] mx-auto px-4 py-20">
      <div className="flex items-center justify-between">
        <p className="text-4xl">Hello Simple Solidity</p>
        <div className="py-3 px-8 bg-zinc-800 text-center cursor-pointer">Connect</div>
      </div>

      <p className="text-2xl my-20">Lorem ipusm...</p>
      <div className="flex items-center gap-5">
        <p>100 Likes</p>
        <p>100 Dislikes</p>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <div className="py-3 w-[200px] bg-blue-500 text-center cursor-pointer">Like</div>
        <div className="py-3 w-[200px] bg-red-700 text-center cursor-pointer">Dislike</div>
      </div>

      <div className="mt-32">
        <p className="mb-5">If you really like this message, buy me a coffee</p>
        <div className="flex items-center gap-5">
          <input className="p-3 text-black w-full max-w-[500px]" type="number" placeholder="Donation amount" />
          <div className="py-3 w-[200px] bg-white text-center text-black cursor-pointer">Donate</div>
        </div>
      </div>
    </main>
  );
}
