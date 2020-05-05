import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name: 'avatar_id',
        ref: inputRef.current,
        path: 'dataset.file',
      });
    }
  }, [inputRef, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt="Preview"
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={inputRef}
        />
      </label>
    </Container>
  );
}
