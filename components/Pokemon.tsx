import React, { useState, useEffect } from 'react'
import { CgPokemon } from 'react-icons/cg'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

const Pokemon: React.FC<PokemonType> = (props: PokemonType) => {
    const [showMore, setShowMore] = useState<Boolean>(false)
    const [showMessage, setShowMessage] = useState<Boolean>(false)
    const name = props.name
    const firstLetterCapitalized = name[0].toUpperCase() + name.slice(1);


    async function create(pokemon: NewPokemonType) {
        try {
            fetch('https://pokedex-app-nu.vercel.app/api/create', {
                body: JSON.stringify(pokemon),
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST'
            }).then(() => {
                console.log('pokemon catched', pokemon)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const catchPokemon = async (data: PokemonType) => {
        try {
            const newObject = {
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                uniqueId: uuidv4()
            }
            create(newObject)
            setShowMessage(true)
        } catch (error) {
            console.log(error)
        }
    }

    const typeStyle = {
        color: props.types[0].name === "Grass" ? "#38b000"
            : props.types[0].name === "Water" ? "#0091ad"
                : props.types[0].name === "Fire" ? "#eb5e28"
                    : props.types[0].name === "Electric" ? "#ffbd00"
                        : props.types[0].name === "Bug" ? "#9D9171"
                            : props.types[0].name === "Poison" ? "#9e0059"
                                : props.types[0].name === "Normal" ? "#001233"
                                    : props.types[0].name === "Ground" ? "#6f4518"
                                        : props.types[0].name === "Ice" ? "#83c5be"
                                            : props.types[0].name === "Fairy" ? "#ee4266"
                                                : props.types[0].name === "Fighting" ? "#e71d36"
                                                    : props.types[0].name === "Dragon" ? "#8f250c"
                                                        : props.types[0].name === "Psychic" ? "#602437"
                                                            : "grey"
    }

    const hpStyle = {
        width: props.base_stats.hp > 100 ? '100%' : `${props.base_stats.hp}%`
    }

    const speedStyle = {
        width: props.base_stats.speed > 100 ? '100%' : `${props.base_stats.speed}%`
    }

    const attackStyle = {
        width: props.base_stats.attack > 100 ? '100%' : `${props.base_stats.attack}%`
    }

    const defenseStyle = {
        width: props.base_stats.defense > 100 ? '100%' : `${props.base_stats.defense}%`
    }

    const Message = (props: PokemonNameType) => {
        useEffect(() => {
            setTimeout(() => {
                setShowMessage(false)
            }, 2000);

        }, []);
        return (
            <h3 style={{ borderColor: typeStyle.color }} className="alert-message">You have catched: {firstLetterCapitalized}!</h3>
        )
    }


    return <div className="pokemon-container" style={{ borderColor: typeStyle.color }}>


        {showMore ? <div></div> :
            <div className="pokemon-title" >
                <h3 style={{ color: typeStyle.color }}>{firstLetterCapitalized}  #{props.id}</h3>
                <span onClick={() => catchPokemon(props)}><CgPokemon /></span>
            </div>}
        {showMessage ? <Message name={props.name} /> : null}

        {showMore ? (<div className="more-container">
            <h4 style={{ borderColor: typeStyle.color }}>Evolutions:</h4>
            <ul className="more-evolutions">
                {props.evolves_from === null ? null : <li>From: {props.evolves_from.name}</li>}
                {props.evolves_to === null ? null : <li>To: {props.evolves_to[0].name}</li>}
            </ul>
            <ul className="stats-list">

                <h4 style={{ borderColor: typeStyle.color }}>Properties:</h4>
                <li>Weight: {props.height}</li>
                <li>Height: {props.weight}</li>
            </ul>
            <div className="more-abilities">
                <h4 style={{ borderColor: typeStyle.color }}>Abilities:</h4>
                <ul className="abilities-list">

                    {props.abilities.map(ability => <li key={ability.name} style={{ borderColor: typeStyle.color }}>{ability.name}</li>)}
                </ul>
            </div>
        </div>) : <div className="pokemon-content"><div><Image width="120px" height="120px" layout="fixed" src={props.sprites.front_default} alt={props.name} /></div>
            <ul className="stats-list">
                <li>HP: {props.base_stats.hp}<div style={{ width: hpStyle.width, backgroundColor: typeStyle.color }} ></div></li>
                <li>Speed: {props.base_stats.speed}<div style={{ width: speedStyle.width, backgroundColor: typeStyle.color }}></div></li>
                <li>Attack: {props.base_stats.attack}<div style={{ width: attackStyle.width, backgroundColor: typeStyle.color }}></div></li>
                <li>Defense: {props.base_stats.defense}<div style={{ width: defenseStyle.width, backgroundColor: typeStyle.color }}></div></li>
            </ul>
            <ul className="type-list">
                {props.types.map(type => <li className="type-item" key={type.name} style={{ borderColor: typeStyle.color }}>{type.name}</li>)}
            </ul></div>}
        {showMore ?
            <button onClick={() => (setShowMore(false))} style={{ backgroundColor: typeStyle.color }}>Show less</button> :
            <button onClick={() => (setShowMore(true))} style={{ backgroundColor: typeStyle.color }}>Show more</button>}
    </div >
}

export default Pokemon;