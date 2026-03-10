import './FormField.css'

export default function FormField({ id, label, placeholder, text, setText, multiline = false }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
      ) : (
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
    </div>
  )
}