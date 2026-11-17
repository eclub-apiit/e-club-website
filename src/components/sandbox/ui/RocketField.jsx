import React from 'react';

const ROCKETS = [
  { side: 'left-[3%]', top: 'top-[4%]', width: 'w-9', opacity: 'opacity-25', rotate: '-rotate-12' },
  { side: 'left-[1.5%]', top: 'top-[18%]', width: 'w-7', opacity: 'opacity-20', rotate: 'rotate-6', flip: true },
  { side: 'left-[4%]', top: 'top-[32%]', width: 'w-10', opacity: 'opacity-30', rotate: '-rotate-6' },
  { side: 'left-[2%]', top: 'top-[46%]', width: 'w-8', opacity: 'opacity-25', rotate: 'rotate-12', flip: true },
  { side: 'left-[4.5%]', top: 'top-[60%]', width: 'w-9', opacity: 'opacity-20', rotate: '-rotate-3' },
  { side: 'left-[1.5%]', top: 'top-[74%]', width: 'w-7', opacity: 'opacity-25', rotate: 'rotate-6', flip: true },
  { side: 'left-[3.5%]', top: 'top-[88%]', width: 'w-10', opacity: 'opacity-30', rotate: '-rotate-12' },
  { side: 'right-[2.5%]', top: 'top-[10%]', width: 'w-8', opacity: 'opacity-20', rotate: 'rotate-12', flip: true },
  { side: 'right-[4%]', top: 'top-[24%]', width: 'w-9', opacity: 'opacity-25', rotate: '-rotate-6' },
  { side: 'right-[1.5%]', top: 'top-[38%]', width: 'w-7', opacity: 'opacity-20', rotate: 'rotate-6', flip: true },
  { side: 'right-[4.5%]', top: 'top-[52%]', width: 'w-10', opacity: 'opacity-30', rotate: '-rotate-12' },
  { side: 'right-[2%]', top: 'top-[66%]', width: 'w-8', opacity: 'opacity-25', rotate: 'rotate-6', flip: true },
  { side: 'right-[4%]', top: 'top-[80%]', width: 'w-9', opacity: 'opacity-20', rotate: '-rotate-6' },
  { side: 'right-[2%]', top: 'top-[93%]', width: 'w-7', opacity: 'opacity-25', rotate: 'rotate-12', flip: true },
];

const MOBILE_ROCKETS = [
  { side: 'left-[1%]', top: 'top-[3%]', width: 'w-8', opacity: 'opacity-20', rotate: '-rotate-12' },
  { side: 'right-[1%]', top: 'top-[10%]', width: 'w-7', opacity: 'opacity-[0.16]', rotate: 'rotate-12', flip: true },
  { side: 'left-[1%]', top: 'top-[23%]', width: 'w-9', opacity: 'opacity-20', rotate: '-rotate-6', flip: true },
  { side: 'right-[1%]', top: 'top-[31%]', width: 'w-7', opacity: 'opacity-[0.16]', rotate: 'rotate-6' },
  { side: 'left-[1%]', top: 'top-[46%]', width: 'w-8', opacity: 'opacity-20', rotate: 'rotate-6', flip: true },
  { side: 'right-[1%]', top: 'top-[54%]', width: 'w-9', opacity: 'opacity-[0.16]', rotate: '-rotate-12' },
  { side: 'left-[1%]', top: 'top-[69%]', width: 'w-7', opacity: 'opacity-20', rotate: '-rotate-6' },
  { side: 'right-[1%]', top: 'top-[77%]', width: 'w-8', opacity: 'opacity-[0.16]', rotate: 'rotate-12', flip: true },
  { side: 'left-[1%]', top: 'top-[90%]', width: 'w-8', opacity: 'opacity-20', rotate: 'rotate-6', flip: true },
  { side: 'right-[1%]', top: 'top-[96%]', width: 'w-7', opacity: 'opacity-[0.16]', rotate: '-rotate-6' },
];

function Rocket({ rocket }) {
  return (
    <img
      src="/sandbox/assets/rocket.png"
      alt=""
      aria-hidden="true"
      className={`absolute ${rocket.side} ${rocket.top} ${rocket.width} ${rocket.opacity} ${rocket.rotate} ${rocket.flip ? 'scale-x-[-1]' : ''} h-auto select-none`}
    />
  );
}

const SPARSE_DESKTOP = [0, 3, 6, 9, 11, 13].map((index) => ROCKETS[index]);
const SPARSE_MOBILE = [0, 3, 6, 9].map((index) => MOBILE_ROCKETS[index]);

export default function RocketField({ sparse = false, dropRight = 0, topRocket = false }) {
  let desktop = sparse ? SPARSE_DESKTOP : ROCKETS;
  if (dropRight > 0) {
    let removed = 0;
    desktop = desktop.filter((rocket) => {
      if (removed < dropRight && rocket.side.startsWith('right-')) {
        removed += 1;
        return false;
      }
      return true;
    });
  }

  if (topRocket) {
    desktop = [...desktop, { side: 'right-[3%]', top: 'top-[13%]', width: 'w-8', opacity: 'opacity-25', rotate: 'rotate-12', flip: true }];
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 hidden xl:block">
        {desktop.map((rocket, index) => <Rocket key={index} rocket={rocket} />)}
      </div>
      <div className="absolute inset-0 block xl:hidden">
        {(sparse ? SPARSE_MOBILE : MOBILE_ROCKETS).map((rocket, index) => <Rocket key={index} rocket={rocket} />)}
      </div>
    </div>
  );
}
