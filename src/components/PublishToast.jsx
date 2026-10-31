"use client";

export default function PublishToast({
  show,
  message = 'Published'
}) {
  return <div aria-live="polite" className={`fixed bottom-8 left-0 right-0 flex justify-center z-50 transition-all duration-300 px-4 pointer-events-none ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="bg-tlcc-navy text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold max-w-sm mx-auto text-center pointer-events-auto">
        {message}
      </div>
    </div>;
}
