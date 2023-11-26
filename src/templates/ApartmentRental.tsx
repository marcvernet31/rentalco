import { Page, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

const ApartmentRental = () => (
    <Document>
        <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Created with react-pdf ~
        </Text>
        <Text style={styles.title}> Rental contract </Text>
        <Text style={styles.author}> Luxembourg </Text>
        <Text style={styles.text}>
            {`
            [Our names + address + phone + e-mail], acting for the purposes hereof in a joint and indivisible manner, as the owners, a term under which they will be designated below, on the one hand,
            and
            [The co-tenant's name + address + phone + e-mail], 
            as co-tenant, term under which it will be designated below, on the other hand,
            agree on the following:
            `}
        </Text>
        <Text style={styles.text}>
            {`
            1- PURPOSE OF THE RENTAL The owners hereby give in co-tenancy to the co-tenant who accepts, for having visited it, [the room + the other facilities included], registered in the land register of the municipality of Luxembourg at [L-XXXX Luxembourg, address of the tenancy]. The apartment is furnished, an exhaustive inventory of the furniture present in the room will be drawn up between the parties to the contract during the inventory of fixtures at entry. An equipped kitchen is present in the apartment. The inventory of fixtures drawn up jointly by the owner or his representative as well as by the co-tenant upon handing over the keys will form an integral part of this contract.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            2- DURATION OF THE RENTAL The lease is concluded for a specific period which will begin on [date] and end on [date]. Both parties will not be able to terminate this contract before [date]. This contract may be extended at the request of the co-tenant before [date]. From [date] the search for a new co-tenant will begin for the owners. The premises are rented for private residential purposes and will be occupied as a main residence by the co-tenant, i.e. a maximum of one person. Any change in the number of occupants will not be accepted by the owners.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            3) RENT A mutually agreed monthly rent (fixed charges included) is set at [XXX] EUR (XXX euros). It is payable by standing order and in advance on the first of each month to account number [account information] in the name of [our names] with the BANQUE ET CAISSE D'ÉPARGNE DE L'ÉTAT (BCEELULL). The rent is payable by the co-tenant.
            In addition, the co-tenant will provide, no later than [date] before handing over the keys, a rental deposit to guarantee possible damage to the rented premises, the amount of which corresponds to 2 months (two months) of rent, i.e. that is to say the sum of [XXXX] EUR (one thousand nine hundred euros). The deposit will not be limited in time and will remain in effect until the co-tenant has proven the good and complete execution of all the obligations incumbent on him under this contract, extension period included.
            The rent may be reassessed every 2 years according to the law of 09/21/2006.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            4) CHARGES AND CONDITIONS \n
            1) Own consumption of electricity; 2) heating, hot water and cold water costs; 3) common electricity costs, pipe taxes, garbage removal, management costs, chimney sweeping costs, cleaning costs for common areas, elevator costs, etc. ( this list is not exhaustive) ; 4) Internet subscription fees 5) Rental insurance in compliance with the insurance contract issued by [insurance company] and the regulations in force. Any object of the co-tenant having a value of more than 5,000 EUR (five thousand euros) must be declared to the owners. 6) The cost of cleaning the apartment at least twice a month
            Charges are fixed and included in the rent amount. There will therefore be no final count.
            However, if the owners notice that consumption is excessive and does not correspond to occupation as a "good father", they reserve the right to adapt and reassess the amount of the rent accordingly, by simple letter addressed to the co-tenant.
            The charges will be reviewed every 03/31, 06/30, 09/30 and 12/31 and if an increase must be applied it will not be greater than 10% of the amount of the current charges. Current charges are estimated at 90 EUR per co-tenant.
            By prior appointment, the co-tenant will be kind enough to allow free access to the radiators of the apartment either to allow the reading of the meters, or to allow the exchange of evaporation capsules and sealing of the meters. Calorimeters possibly damaged by the fault of the co-tenant must be reported and will be replaced at their expense. The co-tenant undertakes to heat the apartment so that the temperature will never fall below 15 degrees Celsius. For ecological and economic reasons it is recommended not to heat above 19 degrees. The owners cannot be held responsible for irregularities or interruptions in the water, gas, electricity or any other similar collective services external to the building, the owners not being required, moreover, to warn the co-tenant of interruptions.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            5) MAINTENANCE, WORK AND REPAIR The co-tenant will keep the premises, throughout the duration of the contract, in good repair and will carry out all rental repairs which are made necessary by her fault. It will not carry out any transformation, any drilling of walls or vaults, any construction, no posting on walls or doors, windows or furniture, no driving of nails for pictures etc. without the express written permission of the owner. When authorization as provided for in the preceding paragraph is granted, the co-tenant undertakes, at the end of the lease, to return the apartment to its pristine condition. The co-tenant undertakes to bear, within the limits provided for in article 1724 of the Civil Code, the inconveniences arising for her from all repair and maintenance work in the building without being able to request any compensation or reduction in rent.
            The owner undertakes to limit, as far as possible, in importance and duration, the inconveniences arising for the co-tenant from this work. The co-tenant must deposit at her own expense and without delay all formwork and decorations as well as all installations that she has made and the removal of which would be useful for the search and repair of leaks of any kind, cracks in the conduits of chimney or ventilation, particularly after fire or infiltration and in general for the execution of all work. The co-tenant will be responsible for rental repairs and maintenance and must return the premises in good condition for said repairs at the end of the lease, the owners being only required to carry out major repairs such as they are defined in article 606 of the Civil Code. The co-tenant will inform the owners without delay of any need which appears to carry out repairs incumbent on the latter as well as of any disasters or damage observed in the premises, under penalty of being considered personally liable for the direct or indirect damage resulting for owners for the delay caused in reporting the loss to insurers.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            6) ASSIGNMENT OF RENTAL RIGHTS The co-tenant is prohibited from assigning or subletting this lease without written authorization from the owner.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            7) RESPONSIBILITIES AND REMEDIES The co-tenant will do his personal business at his own risk, peril and expense, without the owners being able to be worried or sought, for any claim made by neighbors or third parties, in particular for noise, odors, fumes, heat and trembling, caused by her or by the devices belonging to her.
            However, in the event that the owners have to pay any sums due to the co-tenant, the latter would be required to reimburse them without delay. The co-tenant also waives the right to claim from the owners, in the event of material or immaterial damage, compensation for loss of use.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            8) RESTITUTION OF THE PREMISES The co-tenant undertakes to redo or, if necessary, replace anything that is no longer in pristine condition minus natural obsolescence. If this is not the case, the owners will restore it to pristine condition at the expense of the co-tenant. She must return the premises in very good condition, taking into account normal wear and tear, and reimburse the owners for the amount of repairs that may prove necessary after her departure. The interior fittings and installations which may be considered as buildings by destination in application of articles 524 and 525 of the Civil Code will, at the end of the contract, abandoned without compensation by the co-tenant. Any resulting costs will be borne by the co-tenant.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            9) INSURANCE This contract covers rental risk, fire, water damage and broken glass with an insurance company approved in the Grand Duchy of Luxembourg
            `}
        </Text>
        <Text style={styles.text}>
            {`
            10) NON-EXECUTION BY THE CO-TENANT OF HER OBLIGATIONS In the event of non-compliance by the co-tenant with the obligations arising from this lease, the owners have the right, eight days after formal notice by registered letter to the post office which remains unsuccessful, to have the overlooked obligation carried out or repair the consequences of the deficiency by any person of their choice at the expense, risk and peril of the co-tenant.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            11) RESOLUTION CLAUSE The non-payment by the co-tenant of a single term of the rent on the due dates provided above or of the charges, fees and premiums due to the owners will result in the automatic termination of this contract, after formal notice by registered letter which remains unsuccessful after 7 days, the date of dispatch of the post being taken as proof. Any delay in the payment of an amount due to the co-tenant will be subject to interest calculation at the interest rate of 5% or the legal rate if this was higher from from the 8th day of the due date and this even without formal notice.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            12) VISIT THE PREMISES Once a year, by appointment agreed in advance, reasonable access to all the rented parts is granted to the owners or to an agent chosen by them in order to verify the fulfillment of the obligations of the co - tenant, but the fact of not using this option does not in any way reduce the liability of the co-tenant. Three months before the expiration of the lease or in the event of sale of the apartment, the co-tenant must tolerate visits by potential clients for two days a week, 2 consecutive hours (during office hours). A sign may also be posted in a clearly visible place, without possible recourse on the part of the co-tenant.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            13) INTERIOR ORDER Keeping dogs or other animals is not permitted in the building without the written consent of the owner. In addition, the owners also prohibit storing crates, packages, bicycles, baby carriages and in general anything, in the entrance to the building, the corridors or landings. The rental contract may be terminated for the reasons provided for by the legal provisions governing rental leases, in particular for abuse of use, non-compliance with internal regulations, change of destination without authorization from the owners and serious reasons.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            14) HANDOVER OF KEYS Handover of keys will only take place after: 
            Payment of the first month's rent, i.e. [XXX] EUR (XXZ euros) for the period from [date] to [date] no later than [date].
            Payment of the rental guarantee of [XXX] EUR (XXX euros) no later than [XXX]. Payments must be visible in the owners' bank account on the dates indicated.
            `}
        </Text>
        <Text style={styles.text}>
            {`
            15) REGISTRATION, JURISDICTIONS AND DISPUTES For what is not specifically provided for in this lease, the parties refer to Luxembourg legal requirements and local customs regarding leases and for all disputes relating to the execution of these leases, the parties give jurisdiction to the courts of the district of and in Luxembourg , notwithstanding cases of multiple defendants or warranty claims. The obligation to register this lease contract falls on the owners or the co-tenant or the co-guarantor and the registration costs are the responsibility of the applicant. 
            `}
        </Text>
        <Text style={styles.text}>
            {`
            16) CLEANING COSTS After departure, a complete cleaning of the room and all the household linen provided is taken to the dry cleaners for cleaning. This corresponds to a fixed compensation of 0 EUR (zero euro). In any case, the condition of the apartment must be impeccable. 
            `}
        </Text>
        <Text style={styles.text}>
            {`
            17) LIFE IN A CO-TENANT Each co-tenant is responsible for keeping their room but also the common areas clean and free of damage. For cleaning, the co-tenant understands that cleaning teams will have access to her room. The co-tenant is responsible for maintaining their sheets and also their towels. Daily cleaning and hygiene products are the responsibility of the co-tenant. Also the removal of rubbish (trash cans) must be done regularly by the co-tenant in order to avoid any damage. By signing this contract, the co-tenant authorizes the owners to create a WhatsApp group in order to facilitate communication between the co-tenants and the owners. 
            `}
        </Text>
        <Text style={styles.text}>
            {`
            18) ANNEXES The inventory established when the keys are handed over will be annexed to this contract. At the end of the rental, in the event that the co-tenant, duly summoned, is not present on the dates and times set, the inventory and repairs can be carried out in his absence, at the earliest useful date, and possibly if necessary with a bailiff's report. This inventory will be established contradictorily. In the absence of this inventory, the co-tenant will be deemed to have received the rented item in perfect condition without subsequently being able to establish proof to the contrary.
            `}
        </Text>
        <Text style={styles.text}>
            {`Done in as many copies as there are parts, in Luxembourg, on DD/MM/YYYY.`}
        </Text>
        <Text style={styles.text}>
            {`
            The owner: _______________________  The tenant: ________________________
            Signature preceded by the words “Read and approved”
            `}
        </Text>
        </Page>
    </Document>
)

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
});
  



export default ApartmentRental;