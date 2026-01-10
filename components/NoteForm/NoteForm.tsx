import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onClose: () => void;
}

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (values: NoteFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.formGroup}>
          Title
          <Field name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </label>

        <label className={css.formGroup}>
          Content
          <Field name="content" as="textarea" className={css.textarea} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </label>

        <label className={css.formGroup}>
          Tag
          <Field name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </label>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.submitButton}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}