export default interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
  shipCells?: { x: number; y: number; status: 1 | 3 | 4 }[];
  isKilled?: boolean;
}
