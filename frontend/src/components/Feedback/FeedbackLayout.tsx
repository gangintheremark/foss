import { ReactNode } from 'react';

const FeedbackLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-2/3 min-w-[960px] relative min-h-[720px] mx-auto my-0">{children}</div>;
};

export default FeedbackLayout;
