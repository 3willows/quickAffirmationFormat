import { useState } from "react"
import { DisplayParties } from "./Party&DisplayParties"

export function Parties({
  plaintiffs,
  defendants,
  setPlaintiffs,
  setDefendants,
}) {
  const parties = [{ name: "SELECT PARTY" }, ...plaintiffs, ...defendants]
  const [side, setSide] = useState("P")
  const [newParty, setNewParty] = useState({ name: "" })
  const [toRemove, setToRemove] = useState("")

  const handleInputChange = (e) => {
    setNewParty({ name: e.target.value.toUpperCase() })
  }

  const handleAddParty = (e) => {
    e.preventDefault()
    if (!newParty || !newParty.name) {
      return
    }
    if (parties.some((obj) => obj.name === newParty.name)) return
    side === "P" && setPlaintiffs((plaintiffs) => [...plaintiffs, newParty])
    side === "D" && setDefendants((defendants) => [...defendants, newParty])
    setNewParty({ name: "" })
  }

  function removeParty(toRemove) {
    setPlaintiffs((parties) =>
      parties.filter((party) => party.name !== toRemove)
    )
    setDefendants((parties) =>
      parties.filter((party) => party.name !== toRemove)
    )
  }
  const handleRemoveParty = (e) => {
    e.preventDefault()
    removeParty(toRemove.toUpperCase())
  }

  return (
    <div className="go-left">
      <DisplayParties plaintiffs={plaintiffs} defendants={defendants} />

      <div className="flex-outside">
        <AddParty
          partyType="P"
          {...{ handleAddParty, side, setSide, handleInputChange, newParty }}
        />

        <RemoveParty
          {...{ toRemove, setToRemove, parties, handleRemoveParty }}
        />

        <AddParty
          partyType="D"
          {...{ handleAddParty, side, setSide, handleInputChange, newParty }}
        />
      </div>
    </div>
  )
}

function AddParty({
  partyType,
  handleAddParty,
  side,
  setSide,
  handleInputChange,
  newParty,
}) {
  return (
    <div className="flex-box ">
      <form onSubmit={handleAddParty} onChange={() => setSide(partyType)}>
        <button> Add {partyType} </button>
        <input
          type="text"
          value={side === partyType ? newParty.name : ""}
          onChange={handleInputChange}
        ></input>
      </form>
    </div>
  )
}

function RemoveParty({ toRemove, setToRemove, parties, handleRemoveParty }) {
  return (
    <div className="flex-box">
      <form onSubmit={handleRemoveParty}>
        <button type="submit">Delete</button>
        <select
          value={toRemove}
          onChange={(e) => setToRemove(e.target.value.toUpperCase())}
        >
          {parties.map((party) => (
            <option value={party.name}>{party.name}</option>
          ))}
        </select>
      </form>
    </div>
  )
}