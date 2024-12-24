import supabase from '@/utils/supabase/supabaseClient'

async function TableBox() {
	let { data: boxes, error } = await supabase.from('boxes').select('*')
	return (
		<div>
			{boxes?.map(box => (
				<div key={box.id}>
					<h2>{box.name}</h2>
					<p>{box.description}</p>
				</div>
			))}
		</div>
	)
}

export default TableBox
