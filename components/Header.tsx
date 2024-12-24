function Header() {
	return (
		<header className='flex justify-between bg-pink-200 p-4'>
			<div className='flex justify-center'>
				<img
					src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png'
					alt=''
				/>
				<p className='font-bold text-2xl pt-3 pl-3'>user</p>
			</div>
			<div className='flex space-x-4 '>
				<button className='px-5 border-8 border-pink-400 rounded-3xl hover:bg-pink-400'>
					Играть
				</button>
				<button className='px-5 border-8 border-pink-400 rounded-3xl hover:bg-pink-400'>
					Выход
				</button>
			</div>
		</header>
	)
}

export default Header
