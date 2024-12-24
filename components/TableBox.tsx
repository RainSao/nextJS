'use client'

import supabase from '@/utils/supabase/supabaseClient'
import { useEffect, useState } from 'react'

type Box = {
	id: string
	name: string
	description: string
}

const TableBox: React.FC = () => {
	const [boxes, setBoxes] = useState<Box[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [selectedBox, setSelectedBox] = useState<Box | null>(null)
	const [newBox, setNewBox] = useState({ name: '', description: '' })

	// Fetch boxes on component mount
	useEffect(() => {
		const fetchBoxes = async () => {
			const { data, error } = await supabase.from('boxes').select('*')
			if (error) {
				console.error('Error fetching boxes:', error)
			} else {
				setBoxes(data || [])
			}
		}

		fetchBoxes()
	}, [])

	const deleteBox = async (id: string) => {
		const { error } = await supabase.from('boxes').delete().eq('id', id)
		if (error) {
			console.error('Error deleting box:', error)
		} else {
			setBoxes(prev => prev.filter(box => box.id !== id))
		}
	}

	const updateBox = async (updatedBox: Box) => {
		const { error } = await supabase
			.from('boxes')
			.update({
				name: updatedBox.name,
				description: updatedBox.description,
			})
			.eq('id', updatedBox.id)
		if (error) {
			console.error('Error updating box:', error)
		} else {
			setBoxes(prev =>
				prev.map(box => (box.id === updatedBox.id ? updatedBox : box))
			)
			setIsModalOpen(false)
		}
	}

	const addBox = async () => {
		const { data, error } = await supabase.from('boxes').insert([newBox])
		if (error) {
			console.error('Error adding box:', error)
		} else {
			setBoxes(prev => [...prev, ...(data || [])])
			setNewBox({ name: '', description: '' })
			setIsAddModalOpen(false)
		}
	}

	const openEditModal = (box: Box) => {
		setSelectedBox(box)
		setIsModalOpen(true)
	}

	const handleEditModalSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (selectedBox) {
			updateBox(selectedBox)
		}
	}

	const handleAddModalSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		addBox()
	}

	return (
		<div>
			<div className='flex justify-end mb-4'>
				<button
					className='bg-purple-500 text-white p-2 rounded'
					onClick={() => setIsAddModalOpen(true)}
				>
					Add New Box
				</button>
			</div>

			<div className='flex flex-row'>
				{boxes.map(box => (
					<div className='bg-purple-400 p-14 m-4 max-w-96' key={box.id}>
						<h2 className='text-3xl'>{box.name}</h2>
						<p>{box.description}</p>
						<button
							className='bg-blue-500 text-white p-2 m-2 rounded'
							onClick={() => openEditModal(box)}
						>
							Edit
						</button>
						<button
							className='bg-red-500 text-white p-2 m-2 rounded'
							onClick={() => deleteBox(box.id)}
						>
							Delete
						</button>
					</div>
				))}
			</div>

			{/* Edit Modal */}
			{isModalOpen && selectedBox && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white p-6 rounded shadow-lg'>
						<h2 className='text-2xl mb-4'>Edit Box</h2>
						<form onSubmit={handleEditModalSubmit}>
							<div className='mb-4'>
								<label className='block mb-2'>Name</label>
								<input
									type='text'
									value={selectedBox.name}
									onChange={e =>
										setSelectedBox({ ...selectedBox, name: e.target.value })
									}
									className='border border-gray-300 rounded p-2 w-full'
								/>
							</div>
							<div className='mb-4'>
								<label className='block mb-2'>Description</label>
								<textarea
									value={selectedBox.description}
									onChange={e =>
										setSelectedBox({
											...selectedBox,
											description: e.target.value,
										})
									}
									className='border border-gray-300 rounded p-2 w-full'
								/>
							</div>
							<div className='flex justify-end'>
								<button
									type='button'
									onClick={() => setIsModalOpen(false)}
									className='bg-gray-300 p-2 rounded mr-2'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='bg-blue-500 text-white p-2 rounded'
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Add Modal */}
			{isAddModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white p-6 rounded shadow-lg'>
						<h2 className='text-2xl mb-4'>Add New Box</h2>
						<form onSubmit={handleAddModalSubmit}>
							<div className='mb-4'>
								<label className='block mb-2'>Name</label>
								<input
									type='text'
									value={newBox.name}
									onChange={e => setNewBox({ ...newBox, name: e.target.value })}
									className='border border-gray-300 rounded p-2 w-full'
								/>
							</div>
							<div className='mb-4'>
								<label className='block mb-2'>Description</label>
								<textarea
									value={newBox.description}
									onChange={e =>
										setNewBox({ ...newBox, description: e.target.value })
									}
									className='border border-gray-300 rounded p-2 w-full'
								/>
							</div>
							<div className='flex justify-end'>
								<button
									type='button'
									onClick={() => setIsAddModalOpen(false)}
									className='bg-gray-300 p-2 rounded mr-2'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='bg-purple-700 text-white p-2 rounded'
								>
									Add
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default TableBox
