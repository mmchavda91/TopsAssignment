import React, { useState } from 'react';

/**
 * Q5: Generic Dynamic Form Component (Scaffolded with Copilot)
 * Takes an array of field definitions as props and renders dynamic input fields.
 *
 * @param {string} title - Form heading title
 * @param {Array} fields - Array of field objects { name, label, type, placeholder, required, options, checkboxText }
 * @param {function} onSubmit - Callback function receiving form values on submit
 * @param {string} submitText - Label for submit button
 */
export function DynamicForm({ title, fields = [], onSubmit, submitText = 'Submit' }) {
  // Dynamically initialize form state based on provided fields
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.defaultValue || '';
    });
    return initial;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div style={formStyles.container}>
      {title && <h3 style={formStyles.title}>{title}</h3>}
      <form onSubmit={handleSubmit} style={formStyles.form}>
        {fields.map((field) => (
          <div key={field.name} style={formStyles.fieldGroup}>
            <label style={formStyles.label}>
              {field.label} {field.required && <span style={{ color: '#d32f2f' }}>*</span>}
            </label>

            {/* Select Dropdown */}
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                style={formStyles.input}
              >
                <option value="">-- Select an option --</option>
                {field.options &&
                  field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
              </select>
            ) : field.type === 'checkbox' ? (
              /* Checkbox */
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', color: '#555' }}>{field.checkboxText}</span>
              </div>
            ) : (
              /* Text, Email, Password, Number Inputs */
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                style={formStyles.input}
              />
            )}
          </div>
        ))}

        <button type="submit" style={formStyles.submitBtn}>
          {submitText}
        </button>
      </form>
    </div>
  );
}

/**
 * Customized Implementation: IPL Cricket Fantasy League Sign-Up
 */
export default function FantasyLeagueSignUp() {
  const fantasyFields = [
    {
      name: 'teamName',
      label: 'Fantasy Team Name',
      type: 'text',
      placeholder: 'e.g. Gujarat Titans Warriors',
      required: true,
    },
    {
      name: 'captainName',
      label: 'Team Captain (Real Name)',
      type: 'text',
      placeholder: 'e.g. Hardik Pandya / Shubman Gill',
      required: true,
    },
    {
      name: 'email',
      label: 'Registered Email Address',
      type: 'email',
      placeholder: 'yourname@example.com',
      required: true,
    },
    {
      name: 'favTeam',
      label: 'Favorite IPL Franchise',
      type: 'select',
      options: [
        'Gujarat Titans',
        'Mumbai Indians',
        'Chennai Super Kings',
        'Royal Challengers Bengaluru',
        'Kolkata Knight Riders',
        'Delhi Capitals',
        'Rajasthan Royals',
      ],
      required: true,
    },
    {
      name: 'agreeTerms',
      label: 'Terms & Conditions',
      type: 'checkbox',
      checkboxText: 'I confirm I am 18+ and agree to IPL Fantasy Fair Play rules',
      required: true,
    },
  ];

  const handleFormSubmit = (data) => {
    alert(`🎉 Fantasy Team Created!\nTeam: ${data.teamName}\nCaptain: ${data.captainName}\nFranchise: ${data.favTeam}`);
    console.log('Submitted IPL Fantasy Team Data:', data);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
      <DynamicForm
        title="🏏 IPL Fantasy League 2026 - Sign Up"
        fields={fantasyFields}
        onSubmit={handleFormSubmit}
        submitText="Create Fantasy Team 🚀"
      />
    </div>
  );
}

const formStyles = {
  container: {
    maxWidth: '460px',
    width: '100%',
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    border: '1px solid #e0e0e0',
  },
  title: { textAlign: 'center', color: '#1a237e', margin: '0 0 20px', fontSize: '18px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#333333' },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cfd8dc',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: '#ff6f00',
    color: '#ffffff',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(255, 111, 0, 0.3)',
  },
};
