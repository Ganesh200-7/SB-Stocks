export default function StockCard({ stock, onViewChart }) {
  return (
    <div>
      <h3>{stock.name}</h3>
      <p>{stock.symbol}</p>
      <p>{stock.price}</p>
      <button onClick={() => onViewChart(stock)}>
        View Chart
      </button>
    </div>
  );
}