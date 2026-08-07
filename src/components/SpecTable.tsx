import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { SpecTableContent } from '../content'

export type SpecTableProps = {
  blok: SpecTableContent
}

function SpecTable(props: SpecTableProps) {
  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-16 bg-white items-center flex flex-col"
      {...storyblokEditable(props.blok)}
    >
      <div className="max-w-3xl w-full flex flex-col gap-4">
        {props.blok.title ? (
          <h2 className="text-2xl md:text-3xl leading-tight tracking-[-0.3px] font-extrabold text-[#1F1F1F] font-inter">
            {props.blok.title}
          </h2>
        ) : null}
        <table className="w-full border-collapse text-left text-sm font-inter">
          {props.blok.specs?.thead?.length ? (
            <thead>
              <tr>
                {props.blok.specs.thead.map((cell, index) => (
                  <th
                    key={index}
                    className="border-b border-stone-300 py-2 pr-4 font-semibold text-stone-900"
                  >
                    {cell.value}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {props.blok.specs?.tbody?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.body.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b border-stone-200 py-2 pr-4 text-[#44474A]"
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SpecTable
