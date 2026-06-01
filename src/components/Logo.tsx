// Marca do Vivá — selo "V" + wordmark opcional.
export default function Logo({
  tamanho = 40,
  comNome = true,
  claro = false,
}: {
  tamanho?: number;
  comNome?: boolean;
  claro?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={tamanho}
        height={tamanho}
        viewBox="0 0 512 512"
        role="img"
        aria-label="Vivá"
      >
        <rect
          width="512"
          height="512"
          rx="120"
          fill={claro ? "#ffffff" : "#1F6B4A"}
        />
        <path
          d="M143 143 L256 379 L369 143"
          fill="none"
          stroke={claro ? "#1F6B4A" : "#ffffff"}
          strokeWidth="58"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {comNome && (
        <span
          className={`text-xl font-extrabold tracking-tight ${
            claro ? "text-white" : "text-viva-900"
          }`}
        >
          Vivá
        </span>
      )}
    </div>
  );
}
