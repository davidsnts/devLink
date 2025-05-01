interface SocialProps {
  url: string;
  children: React.ReactNode;
}
export function Social({ url, children }: SocialProps) {
  return <a href={url} rel="noopener noreferrer" target="_blank">{children}</a>;
}
