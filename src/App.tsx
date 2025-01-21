import { ChangeEvent, FormEvent, useRef, useState } from 'react'

type FormType = 'controlled' | 'uncontrolled'

function UncontrolledForm() {
  console.log('render unconroled form')

  const inputRef = useRef<HTMLInputElement>(null)
  const agreementRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    setError('')
    console.log(formData.get('text'))
    console.log(formData.get('agreement'))
    localStorage.setItem('user name', (formData.get('text') as string) ?? '')
    //if (inputRef.current?.value === 'error') setError('wrong name')
    //console.log(inputRef.current?.value)
  }

  return (
    <form id="controlled" className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
      <label>
        <span className="text-gray-700 font-medium mr-2">Username:</span>
        <input
          defaultValue={localStorage.getItem('user name') ?? ''}
          name="text"
          placeholder="Type text"
          className="rounded border border-gray-400 px-3 py-1"
          ref={inputRef}
        />
      </label>
      <label>
        <span className="text-gray-700 font-medium mr-2">Agreement:</span>
        <input name="agreement" type="checkbox" ref={agreementRef} />
      </label>
      <div className="text-red-500">{error}</div>
      <button
        type="submit"
        className="text-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 rounded-md py-3"
      >
        Submit form
      </button>
    </form>
  )
}

function ControlledForm() {
  console.log('render conroled form')

  const [text, setText] = useState(() => localStorage.getItem('user name') ?? '')
  const [isAgree, setIsAgree] = useState(false)
  const [error, setError] = useState('')

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === 'error') setError('wrong name')
    setText(e.currentTarget.value)
    localStorage.setItem('user name', e.currentTarget.value)
  }
  const handleChangeAgreement = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAgree(e.currentTarget.checked)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(text, isAgree)
  }

  return (
    <form id="controlled" className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
      <label>
        <span className="text-gray-700 font-medium mr-2">Username:</span>
        <input
          name="text"
          value={text}
          onChange={handleChangeInput}
          placeholder="Type text"
          className="rounded border border-gray-400 px-3 py-1"
        />
      </label>
      <label>
        <span className="text-gray-700 font-medium mr-2">Agreement:</span>
        <input name="agreement" type="checkbox" checked={isAgree} onChange={handleChangeAgreement} />
      </label>
      <div className="text-red-500">{error}</div>
      <button type="submit" className="text-xl font-bold bg-purple-600 text-white hover:bg-purple-500 rounded-md py-3">
        Submit form
      </button>
    </form>
  )
}

function App() {
  console.log('render app')

  const [activeForm, setActiveForm] = useState<FormType>('controlled')

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-xl bg-stone-800">
      <div className="absolute top-6 left-6 flex gap-x-6">
        <button
          onClick={() => {
            setActiveForm('controlled')
          }}
          disabled={activeForm === 'controlled'}
          className="bg-purple-500 px-4 py-2 text-white font-semibold text-sm rounded-md disabled:bg-gray-300"
        >
          Controlled
        </button>
        <button
          onClick={() => {
            setActiveForm('uncontrolled')
          }}
          disabled={activeForm === 'uncontrolled'}
          className="bg-emerald-500 px-4 py-2 text-white font-semibold text-sm rounded-md disabled:bg-gray-300"
        >
          Unontrolled
        </button>
      </div>
      <div className="bg-zinc-100 rounded-xl border-4 border-purple-300 px-20 py-12">
        {activeForm === 'controlled' && <ControlledForm />}
        {activeForm === 'uncontrolled' && <UncontrolledForm />}
      </div>
    </div>
  )
}

export default App
