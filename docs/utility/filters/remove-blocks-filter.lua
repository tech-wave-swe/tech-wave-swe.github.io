-- local logging = require 'logging'
local in_no_export = false

function Block(el)
  if el.t == "RawBlock" and el.format == "html" then
    if el.text == "<!-- ::: {.no-export} -->" then
      in_no_export = true
      return {}
    elseif el.text == "<!-- ::: -->" then
      in_no_export = false
      return {}
    end
  end
  
  if in_no_export then
    return {}
  end
  
  return el
end