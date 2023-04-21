Lien du github :

	https://github.com/Akumaxblend/AlgorithmicEsthetics_MIRALLES_VERNA.git

Justification du design : 

	Premièrement, notre design bicolore sépare les mots "bons" pour l'environnement et les mots "mauvais" pour celui-ci. 
(Nous entendons par "bons" les mots étant connotés positivement ou bien les abbréviations d'initiatives écologiques).
Les mots "bons" gravitent autour du centre de l'image pour rappeller notre planète, et le fait que nous sommes "coincés" sur elle et donc que nous nous devons de la respecter et de tout faire pour la garder propice à la vie.

Les mots négatifs apparaissent au fil du temps. Si ils sont présent en nombre suffisant, ils suppriment les mots positifs.
Les mots positifs suppriment des mots négatifs au cours du temps, proportionellement à leur nombre.

	Nous avons choisi un design interactif. En fonction des interactions des utilisateurs, la situation peut rester équilibrée entre les mots positifs et négatifs, ou bien basculer en faveur de l'une ou l'autre des catégories. 
Les interactions se font à l'aide de 2 boutons : l'un permet d'ajouter de l'activité humaine (mots négatifs) et l'autre permet d'ajouter des actions pour l'environnement (mots positifs).

En cas de disparition totale des mots positifs, les deux boutons disparaissent à jamais ; on ne peut que regarder les mots négatifs se propager et se multiplier sans rien pouvoir faire.

Le but de ce design est d'émuler la vie réelle ; l'environnement est capable de s'assainir par lui même, avec le temps. Cependant, en cas de déséquilibre trop important causé par les humains, le temps lui manque et il ne parvient plus à tenir le rythme. Si l'on ne veut pas que tout s'arrête, il faut contrebalancer le déséquilibre créé grâce à des actions écologiques en nombre suffisant.
De plus, l'aspect "boucle infinie" nous permet de nous rappeller qu'il faut rester vigilant à jamais, que des erreurs répétées pendant trop longtemps peuvent avoir des conséquences irréversibles.