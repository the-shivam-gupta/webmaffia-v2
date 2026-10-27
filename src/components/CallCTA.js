"use client";

const CALL_NUMBER = "+919867625909"; // +91 98676 25909

export default function CallCTA() {
  return (
    <>
      <a href={`tel:${CALL_NUMBER}`} aria-label="Call us" className="call-cta">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="#ffffff"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>

      <style jsx>{`
        .call-cta {
          position: fixed;
          bottom: 40px;
          right: 40px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #000000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s ease;
        }

        .call-cta:hover {
          animation: call-pulse 1.4s ease-out infinite;
        }

        @keyframes call-pulse {
          0% {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 0 rgba(0, 0, 0, 0.45);
          }
          70% {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 14px rgba(0, 0, 0, 0);
          }
          100% {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </>
  );
}
