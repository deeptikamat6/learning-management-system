function ProgressBar({ percentage }) {
  return (
    <div className="w-full mt-3">

      <div className="bg-gray-300 h-4 rounded-full">

        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-2 text-sm font-semibold">
        {percentage}% Completed
      </p>

    </div>
  );
}

export default ProgressBar;