import supabase from '@/utils/supabase/supabaseClient'

export default async function Index() {
	let { data: boxes, error } = await supabase.from('boxes').select('*')

	return (
		<>
			<main className='flex-1 flex flex-col gap-6 px-4'>
				{boxes?.map(box => (
					<div key={box.id}>
						<h2>{box.name}</h2>
						<p>{box.description}</p>
					</div>
				))}
			</main>
		</>
	)
}
