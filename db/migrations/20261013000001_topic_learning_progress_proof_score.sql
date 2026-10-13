ALTER TABLE public.topic_learning_progress
    ADD COLUMN IF NOT EXISTS proof_score SMALLINT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'topic_learning_progress_proof_score_range'
          AND conrelid = 'public.topic_learning_progress'::regclass
    ) THEN
        ALTER TABLE public.topic_learning_progress
            ADD CONSTRAINT topic_learning_progress_proof_score_range
            CHECK (proof_score IS NULL OR proof_score BETWEEN 0 AND 100);
    END IF;
END;
$$;

NOTIFY pgrst, 'reload schema';
