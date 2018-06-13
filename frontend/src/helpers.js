import React from 'react';
import TextField from 'material-ui/TextField';
import parse from 'autosuggest-highlight/parse';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import CancelIcon from 'material-ui-icons/Cancel';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Typography from 'material-ui/Typography';
import Option from './Components/Organisation/Option';

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(organisation, { query, isHighlighted }) {
  const matches = match(organisation.postCode, query);
  const parts = parse(organisation.postCode, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(
          (part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
              ),
        )}
      </div>
    </MenuItem>
  );
}

// suggestion address container
function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

// Get suggestion address value
function getSuggestionValue(orgainsation) {
  return `${orgainsation.postCode}`;
}
function getSuggestions(value, organisations) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : organisations.filter(organisation => {
      const keep =
        count < 5 &&
        organisation.postCode.toLowerCase().slice(0, inputLength) ===
        inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>No results found</Typography>}
      arrowRenderer={arrowProps =>
        arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

function linkMaker(name) {
  // These [" "] and [/] will replace all of sapce between words or / to none space
  return name
    ? name.replace(/[" "]/g, '').replace(/[/]/g, '').replace(" & ", '').replace(/\b\w/g, l => l.toUpperCase())
    : null;
}

function categoryNameMaker(name) {
  // This [/] will replace all of / to none space
  return name
    ? name.replace(/[/]/g, '').replace("services", '').replace("add", '').replace(/\b\w/g, l => l.toUpperCase())
    : null;
}

function addSpace(cat, catTitle) {
  // This [/] will replace all of / to none space
  return cat.map(category => {
    const title = category.replace(/[/]/g, '');
    if (linkMaker(category) === catTitle) {
      return title
    }
    return false;
  })
}

function addSpaceToCategName(cat, catTitle) {
  if (catTitle.length > 0) {
    const title = categoryNameMaker(catTitle);
    return cat.filter(category => category.replace(/[' ']/g, '').includes(title))
  }
}

function validEmail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(reg.test(email)) return true;
  return false;
}

function sortArrObj(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.org_name.toUpperCase();
  const nameB = b.org_name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}
export default {
  renderInput,
  renderSuggestion,
  renderSuggestionsContainer,
  getSuggestionValue,
  getSuggestions,
  SelectWrapped,
  linkMaker,
  categoryNameMaker,
  addSpace,
  addSpaceToCategName,
  validEmail,
  sortArrObj
};

