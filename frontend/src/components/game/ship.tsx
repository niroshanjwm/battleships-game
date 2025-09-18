export type ShipProps = {
  length: number;
  name: string;
};

const Ship = ({ name, length }: ShipProps) => {
  const generateShipLength = (length: number) => {
    return Array.from({ length }).map((_, index) => {
      return (
        <div className="border p-1 w-10 h-10" key={`${index}`}>
          &nbsp;
        </div>
      );
    });
  };

  return (
    <div className="ship">
      <div className="mt-2">{name}</div>
      <div className="flex mb-5">{generateShipLength(length)}</div>
    </div>
  );
};

export default Ship;
