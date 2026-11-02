import UnlearningClient from './UnlearningClient';
export const metadata = {
  title: 'The Unlearning Conference',
  description: 'A 10-day online conference from The Light Community. Unlearn religion, relearn relationship, with daily sermons at 10AM and live reviews at 8:30PM, June 29 to July 10, 2026.',
  openGraph: {
    title: 'The Unlearning Conference | The Light Community',
    description: 'Ten days to lay down what religion taught us and pick up what God actually said. June 29 to July 10, 2026.',
    images: ['/images/hero.jpg']
  }
};
export default function UnlearningConferencePage() {
  return <UnlearningClient />;
}
