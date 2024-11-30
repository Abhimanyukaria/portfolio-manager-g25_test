import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

// export async function getServerSideProps(context) {
//   try {
//     // Get the user session from Auth0
//     const session = await getSession(context);

//     // Redirect based on whether the user is logged in or not
//     if (!session || !session.user) {
//       // If not logged in, redirect to /landing
//       return { redirect: { destination: '/landing', permanent: false } };
//     } else {
//       // If logged in, redirect to /dashboard
//       return { redirect: { destination: '/dashboard', permanent: false } };
//     }
//   } catch (error) {
//     // Handle any error that occurs
//     console.error('Error checking session:', error);
//     // In case of error, redirect to landing page
//     return { redirect: { destination: '/landing', permanent: false } };
//   }
// }

export default function HomePage() {
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
