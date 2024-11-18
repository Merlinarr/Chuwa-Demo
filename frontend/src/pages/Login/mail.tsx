
export default function MailNotice() {
  return (
    <div className="flex min-h-[300px] w-full max-w-[600px] flex-col justify-center">
      <div className="flex justify-center ">
        <svg
          width="60"
          height="60"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.9166 49.5833H49.5832V40.8333L64.1666 53.9583L49.5832 67.0833V58.3333H37.9166V49.5833ZM58.3332 11.6667H11.6666C10.1195 11.6667 8.63576 12.2813 7.5418 13.3752C6.44783 14.4692 5.83325 15.9529 5.83325 17.5V52.5C5.83325 54.0471 6.44783 55.5308 7.5418 56.6248C8.63576 57.7187 10.1195 58.3333 11.6666 58.3333H32.0833V52.5H11.6666V23.3333L34.9999 37.9167L58.3332 23.3333V40.8333H64.1666V17.5C64.1666 15.9529 63.552 14.4692 62.458 13.3752C61.3641 12.2813 59.8803 11.6667 58.3332 11.6667ZM34.9999 32.0833L11.6666 17.5H58.3332L34.9999 32.0833Z"
            fill="#5048E5"
          />
        </svg>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[386px] text-center text-base font-bold text-ft1">
          We have sent the update password link to your emial, please check that!
        </div>
      </div>
    </div>
  );
}
