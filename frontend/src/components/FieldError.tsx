/**
 * Inline validation message shown under a form field. Renders nothing when the
 * field is valid, so the form's vertical rhythm stays intact.
 */
export default function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-medium leading-snug text-brand-red">
      {message}
    </p>
  );
}
