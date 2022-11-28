import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./Select.css";

type Option = {
  label: string;
  value: string;
};

type InnerOption = {
  option: Option;
  selected?: boolean;
};

type SelectProps = {
  options: Array<Option>;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelected: Function;
};

const Select = (props: SelectProps) => {
  const options = props.options;
  const newArr: InnerOption[] = useMemo(
    () => options.map((o) => ({ option: o, selected: false })),
    [options]
  );

  const [viewArr, setViewArr] = useState<InnerOption[]>(newArr);

  useEffect(() => {
    setViewArr(newArr)
  }, [options])

  const viewSelected = () => {
    let arr = newArr.filter((elem) => elem.selected === true);
    return arr.map((elem, i) => {
      return <div key = {i} className="selectedOptions">{elem.option.label}</div>;
    });
  };

  const filter = (word: string) => {
    setViewArr(newArr.filter((elem) => elem.option.label.includes(word)));
  };

  const check = (checked: boolean, i: number) => {
    newArr[i].selected = checked;
    props.onSelected(newArr.filter(elem => {if(elem.selected) return elem.option.label}))
    setViewArr([...newArr]);
  };

  const selectAll = (select: boolean = true) => {
    newArr.forEach((elem) => {
      elem.selected = select;
    });
    props.onSelected(newArr.filter(elem => {if(elem.selected) return elem.option.label}))
    setViewArr([...newArr]);
  };

  const selected = viewSelected();

  return (
    <div className="select">
      <div className="inputContainer">
        {!!selected.length && <div className="selectedItems">{selected}</div>}
        <input
          placeholder="select format..."
          type="text"
          onClick={() => props.setOpen(true)}
          onChange={(event) => filter(event.target.value)}
        />
      </div>
      <div className="optionsContainer">
        {props.open &&
        viewArr.map((elem, i) => {
          return (
            <div key={i} className="searchOptions">
              <input
                type="checkbox"
                checked={elem.selected}
                onChange={(e) => check(e.target.checked, i)}
              ></input>
              <div>{elem.option.label}</div>
            </div>
          );
        })}
      </div>
      
      {props.open && 
        <>
          {viewArr.every((elem) => elem.selected === true) ? (
            <a className="selectAllButton"
              onClick={() => {
                selectAll(false);
              }}
            >
              deselect all
            </a>
          ) : (
            <a className="selectAllButton"
              onClick={() => {
                selectAll(true);
              }}
            >
              select all
            </a>
          )}
        </>
      }
    </div>
  );
};

export default Select;
